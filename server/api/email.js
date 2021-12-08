const router = require('express').Router();
const requireToken = require('./auth');

const {
	models: { User },
} = require('../db');
module.exports = router;

router.get('/:email', async (req, res, next) => {
	try {
		const user = await User.findOne(
			{
				where: { email: req.params.email },
			}
			// explicitly select only the id and username fields - even though
			// users' passwords are encrypted, it won't help if we just
			// send everything to anyone who asks!
		);

		if (user) res.json('exists');
		else res.json(`doesn't exist`);
	} catch (err) {
		next(err);
	}
});
