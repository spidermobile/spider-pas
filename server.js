// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var restify        = require('express-restify-mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var nodemailer     = require("nodemailer");
var smtpTransport  = require('nodemailer-smtp-transport');
var jwt            = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config         = require('./config/config');

//======================================

var port = process.env.PORT || 8080; // set our port
mongoose.connect(config.dbUrl); // connect to our mongoDB database (commented out after you enter in your own credentials)

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

//email ==================================================
var transporter = nodemailer.createTransport(smtpTransport({
    host: 'localhost',
    port: 25,
    auth: {
        user: 'kumara',
        pass: ''
    }
}));

// routes ==================================================
require('./app/routes')(app, transporter); // pass our application into our routes

// authService ==================================================
require('./app/authService')(app, config, jwt); // pass our application into our routes

// models ==================================================
var associateModel = require('./app/models/associate')(app, mongoose, restify);
app.Associate = associateModel;

// start app ===============================================
// apply the routes to our application with the prefix /api
app.listen(port);
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app;
