const router = require('express').Router();
const {
	models: { User, Pill },
} = require('../db');
const Wallet = require('../db/models/Wallet');
const cron = require('node-cron');
const requireToken = require('./auth');

module.exports = router;

// found at /api/dailypill
router.put('/', async (req, res, next) => {
	try {
		const walletPillsToDecrement = await Wallet.findAll({
			where: {
				userId: req.body.data.userId,
				pillId: req.body.data.pills,
			},
		});

		const decreaseDosage = await walletPillsToDecrement.map((singlePill) => {
			return singlePill.decrement({
				dailyDosage: 1,
			});
		});
		res.send(decreaseDosage);
	} catch (error) {
		next(error);
	}
});

// // found at /api/dailypill/resetDosage
// router.put("/resetDosage", async (req, res, next) => {
//   try {

//     const walletPillsToDecrement = await Wallet.findAll({
//       where: {
//         userId: req.body.data.userId,
//         pillId: req.body.data.pills,
//       },
//     });

// ///update the dosage for every pill
//     // const decreaseDosage = await walletPillsToDecrement.map((singlePill) => {
//     //   return singlePill.decrement({
//     //     dailyDosage: 1,
//     //   });
//     // });
//     // res.send(decreaseDosage);
//   } catch (error) {
//     next(error);
//   }
// });
