module.exports = function(app, config, jwt) {

	app.set('superSecret', config.secret); // secret variable

	//login
	app.post('/api/v1/login', function(req, res) {
		app.Associate.findOne({
			email: req.body.email
		}, function(err, user) {
			if (err) {
				res.json({ success: false, message: 'Authentication failed. Wrong Username.' });
			};
			if (!user) {
				res.json({ success: false, message: 'Authentication failed. User not found.' });
			} else if (user) {
				if (user.password != req.body.password) {
					res.json({ success: false, message: 'Authentication failed. Wrong password.' });
				} else {
					var token = jwt.sign(user, app.get('superSecret'), {
						expiresInMinutes: 180 // expires in 3 hours
					});
					// return the information including token as JSON
					delete user["password"];
					res.status(200).json({
						success: true,
						user: {firstName: user.firstName, roles: user.roles},
						message: 'Login Success',
						token: token
					});
				}
			}
		});
	});

	app.use(function(req, res, next) {
		// check header or url parameters or post parameters for token
		var token = req.body.token || req.query.token || req.headers['x-access-token'];

		// decode token
		if (token) {
			// verifies secret and checks exp
			jwt.verify(token, app.get('superSecret'), function(err, decoded) {
				if (err) {
					return res.status(403).json({ success: false, message: 'Failed to authenticate token.' });
				} else {
					// if everything is good, save to request for use in other routes
					req.decoded = decoded;
					next();
				}
			});
		} else {
			// if there is no token
			// return an error
			return res.status(403).send({
				success: false,
				message: 'No token provided.'
			});
		}
	});
};