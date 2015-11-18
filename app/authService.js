module.exports = function(app, config, jwt, bcrypt) {

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
				if(bcrypt.compareSync(req.body.password, user.password)){
					var token = jwt.sign(user, app.get('superSecret'), {
						expiresInMinutes: 180 // expires in 3 hours
					});
					// return the information including token as JSON
					delete user["password"];
					res.status(200).json({
						success: true,
						user: {firstName: user.firstName, roles: user.roles, token: token},
						message: 'Login Success'
					});
				} else {
					res.json({ success: false, message: 'Authentication failed. Wrong password.' });
				}
			}
		});
	});

	app.post('/api/v1/associates/:id/password', function(req, res) {
		app.Associate.findOneAndUpdate(
			{ _id: req.params.id },
			{ password: bcrypt.hashSync(req.body.password, 10), active: true },
			{new: true},
			function(err, user) {
				if (err) {
					res.json({ success: false, message: 'Error saving password.' });
				};
				if (!user) {
					res.json({ success: false, message: 'Error saving password: User not found.' });
				} else if (user) {
					res.status(200).json({
						success: true,
						user: user,
						message: 'Password saved successfully'
					});
				}
			}
		);
	});

	app.use(function(req, res, next) {
		if(req.url.indexOf("api")<0){
			next();
			return
		};
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