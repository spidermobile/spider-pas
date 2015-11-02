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
};