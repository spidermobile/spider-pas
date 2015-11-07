module.exports = function(app, transporter) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests

	app.get('/', function(req, res) {
		res.sendfile('./public/index.html');
	});

	app.get('/send',function(req,res){
		var mailOptions={
			to : req.query.to,
			subject : req.query.subject,
			text : req.query.text
		};
		transporter.sendMail(mailOptions, function(error, response){
			if(error){
				console.log(error);
				console.log("er=====================================ror");
				console.log(response);
				res.end("error");
			}else{
				res.end("sent");
			}
		});
	});

	app.get('/setup', function(req, res) {

	    // create a sample user
	    var tina = new app.Associate({
	      firstName: 'Tina',
	      lastName: 'Jain',
	      employeeCode: 2026,
	      email: 'tjain@spiderlogic.com',
	      userName: 'tjain',
	      password: 'password',
	      roles: ["Associate", "Admin"],
	      pc: 'gkasturi'
	    });

	    // save the sample user
	    tina.save(function(err) {
	      if (err) {
	        console.log(err);
	      }

	      console.log('User Tina saved successfully');
	    });

	  // create a sample user
	  var asheesh = new app.Associate({
	    firstName: 'Asheesh',
	    lastName: 'Kumar',
	    employeeCode: 6432,
	    email: 'akumar@spiderlogic.com',
	    userName: 'akumar',
	    password: 'password',
	    roles: ["Associate"],
	    pc: 'tjain'
	  });

	  // save user
	  asheesh.save(function(err) {
	    if (err) {
	      console.log(err);
	      res.send({ message :'Something went wrong' });
	    }

	    console.log('User Asheesh saved successfully');
	    res.json({ success: true });
	  });
	});
};
