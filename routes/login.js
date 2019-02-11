let express = require('express');
let LoginService = require('../services/service.login');
let defense = require('../defense.middleware');


function main()
{
	/* populate the login service with static data */
	let data = {user_name: 'jsmastery', password: 'Imustjs1'};

	LoginService.create(data);

	return router;
}

var router = express.Router();

/* GET user listing. */
router.get('/', async function(req, res, next)
{
	res.json({error: "Invalid User UID."});
});

router.post('/login', async (req, res, next) =>
{
	const data = req.body;
	debugger;

	try
	{
		const user = await LoginService.login(data);

		// created the user! 
		return res.status(201).json({ success: true, user: user });
	}
	catch(err)
	{
		if (err.name === 'ValidationError')
		{
        	return res.status(400).json({ error: err.message });
		}
		else if (err.name === 'AuthenticationError')
		{
        	return res.status(401).json({ error: err.message });
		}

		// unexpected error
		return next(err);
	}
});

/* adds a new customer to the list */
router.post('/add', defense.validateToken, async (req, res, next) =>
{
	const data = req.body;

	try
	{
		const user = await LoginService.create(data);

		// created the user! 
		return res.status(201).json({ success: true, user_name: user.user_name });
	}
	catch(err)
	{
		if(err.name === 'ValidationError')
		{
			// indicate problem with authorizing the user
        	return res.status(401).json({ error: err.message });
		}
		else if(err.name == "UserError")
		{
			// indicate conflict
			return res.status(409).json({ error: err.message });
		}

		// unexpected error
		return next(err);
	}
});

router.use('/login/:id', defense.validateToken);

/* retrieves a user by user_name */
router.get('/login/:id', async (req, res, next) =>
{
	try
	{
		const user = await LoginService.retrieve(req.params.id);

		/* transform result into a json object */
		const nuser = {user_name: user.user_name, counter: user.counter, nextCounter: user.nextCounter}

		return res.json({ user: nuser });
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

/* updates the user by user_name */
router.put('/login/:id', async (req, res, next) =>
{
	try
	{
		const user = await LoginService.update(req.params.id, req.body);

		/* transform result into a json object */
		const nuser = {user_name: user.user_name, counter: user.counter, nextCounter: user.nextCounter}

		return res.json({ user: nuser });
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

/* removes the user from the user list by user_name */
router.delete('/login/:id', async (req, res, next) =>
{
	try
	{
		const user = await LoginService.delete(req.params.id);

		return res.json({success: true});
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

/* increments a user counter */
router.get('/increment/:id', defense.validateToken, async (req, res, next) =>
{
	try
	{
		const user = await LoginService.increment(req.params.id);

		/* transform result into a json object */
		const nuser = {user_name: user.user_name, counter: user.counter, nextCounter: user.nextCounter}

		return res.json({ user: nuser });
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

module.exports = main();
