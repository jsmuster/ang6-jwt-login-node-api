let express = require('express');
let path = require('path');
//let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

//let jwt = require('jsonwebtoken');
//let config = require('./config');

let userRoutes = require('./routes/login');

let reporter = function (type, ...rest)
{
	// remote reporter logic goes here
};

/* handle an uncaught exception & exit the process */
process.on('uncaughtException', function (err)
{
	console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
	console.error(err.stack);

	reporter("uncaughtException", (new Date).toUTCString(), err.message, err.stack);

	process.exit(1);
});

/* handle an unhandled promise rejection */
process.on('unhandledRejection', function (reason, promise)
{
	console.error('unhandled rejection:', reason.message || reason);

	reporter("uncaughtException", (new Date).toUTCString(), reason.message || reason);
})

// application entry point
function main()
{
	var app = express();

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	//app.use(cookieParser())

	app.use(function(req, res, next)
	{
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
	});

	//app.use('/api', apiRoutes);

	app.use('/api/v1/user', userRoutes);

	return app;
}

module.exports = main();
