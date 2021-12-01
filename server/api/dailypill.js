const router = require("express").Router();
const {
  models: { User, Pill },
} = require("../db");
const Wallet = require("../db/models/Wallet");
module.exports = router;

// found at /api/dailypill
router.put("/", async (req, res, next) => {
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
