const router = require('express').Router();
const {
	models: { User, Pill },
} = require('../db');
const Wallet = require('../db/models/Wallet');
const cron = require('node-cron');
const requireToken = require('./auth');

module.exports = router;

// found at /api/dailypill
router.put('/', requireToken, async (req, res, next) => {
	try {
		const walletPillsToDecrement = await Wallet.findAll({
			where: {
				userId: req.body.userId,
				pillId: req.body.pills,
			},
		});

		const reducedDosage = await walletPillsToDecrement.map((singlePill) => {
			singlePill.decrement({
				dailyDosage: 1,
			});
			return singlePill;
		});
		res.send(reducedDosage);
	} catch (error) {
		next(error);
	}
});
