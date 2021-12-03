const router = require('express').Router();
const {
	models: { User },
} = require('../db');
module.exports = router;

router.post('/login', async (req, res, next) => {
	try {
		res.send({ token: await User.authenticate(req.body) });
	} catch (err) {
		next(err);
	}
});

router.post('/signup', async (req, res, next) => {
	try {
		const { first, last, age, height, weight, email, phone, morningReminder, nighttimeReminder, password, avatar } =
			req.body;

		const user = await User.create({
			firstName: first,
			lastName: last,
			age: age,
			weight: weight,
			height: height,
			email,
			phone,
			morningReminder,
			nighttimeReminder,
			password,
			avatar: avatar,
		});
		res.send({ token: await user.generateToken() });
	} catch (err) {
		if (err.name === 'SequelizeUniqueConstraintError') {
			res.status(401).send('User already exists');
		} else {
			next(err);
		}
	}
});

router.get('/me', async (req, res, next) => {
	try {
		res.send(await User.findByToken(req.headers.authorization));
	} catch (ex) {
		next(ex);
	}
});
