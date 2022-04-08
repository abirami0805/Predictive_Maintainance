// server.js
// set up ======================================================================
// get all the tools we need
var express  = require('express');
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app      = express();
var port     = process.env.PORT || 4007;
var mysql = require('mysql');
var moment = require('moment');
var dbconfig = require('./config/database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);
var pdf = require('pdfkit');
var fs = require('fs');
var http = require('http');
var urlencode = require('urlencode');
var request = require('request');
var mqtt = require('mqtt');
var options = {
	username:'freeza',
	password:'freeza'
};
var client  = mqtt.connect('mqtt://broker.hivemq.com',options);
client.on("connect", function () {
});
function bill_payment_status(paidStatus){
		client.publish("freeza/bill_payment",paidStatus);
		console.log("Publish Command Sent123");
}
app.get('/allow',function(req,res){
	let x='#';
	 bill_payment_status(x);
	res.redirect('back');
});
app.get('/disallow',function(req,res){
	let x='*'
	bill_payment_status(x);
	res.redirect('back');
});
var passport = require('passport');
var flash    = require('connect-flash');
// configuration ===============================================================
// connect to our database
require('./config/passport')(passport); // pass passport for configuration
// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.set('view engine', 'ejs'); // set up ejs for templating
// required for passport
app.use(session({
	secret: 'Mashaallah',
	resave: true,
	saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();   
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();                          
// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

app.get('/equipment_Value',function(req,res){
	connection.query("SELECT * FROM equipment_Value  ORDER BY dt DESC LIMIT 1", function(err, rows){
		if(!err){
			res.json(rows);
		}

	});
})






// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
