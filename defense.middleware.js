// this is middleware that gets a token from request and proceeds only when the token is validated.

let jwt = require('jsonwebtoken');
const config = require('./config.js');

let validateToken = (req, res, next) => 
{
  	let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  	
	if(token != null)
	{
		// Remove Bearer from string
		if(token.startsWith('Bearer '))
		{
			token = token.slice(7, token.length);
		}
		
		jwt.verify(token, config.secret, (err, decoded) => {

			if(err)
			{
				return res.json({
					success: false,
					message: 'Invalid token'
				});
			}
			else
			{
				req.decoded = decoded;
				next();
			}

		});
	}
	else
	{
		return res.json({
			success: false,
			message: 'Auth token is not supplied'
		});
	}
};

module.exports = {validateToken: validateToken};