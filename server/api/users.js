const router = require('express').Router();
const requireToken = require('./auth');

const {
	models: { User },
} = require('../db');
module.exports = router;

router.get('/', requireToken, async (req, res, next) => {
	try {
		const users = await User.findAll({
			// explicitly select only the id and username fields - even though
			// users' passwords are encrypted, it won't help if we just
			// send everything to anyone who asks!
			attributes: ['id', 'username'],
		});
		res.json(users);
	} catch (err) {
		next(err);
	}
});
//api/users/profile/:id
router.get('/:id', requireToken, async (req, res, next) => {
	try {
		const user = await User.findByPk(
			req.params.id
			// explicitly select only the id and username fields - even though
			// users' passwords are encrypted, it won't help if we just
			// send everything to anyone who asks!
		);
		res.json(user);
	} catch (err) {
		next(err);
	}
});

router.put('/:id', requireToken, async (req, res, next) => {
	try {
		const user = await User.findByPk(req.params.id);
		res.send(await user.update(req.body));
	} catch (error) {
		console.log('error', error);
		// const errMsg = error[0].message;
		// res.status(405).json(errMsg);
		// next(error);
	}
});
