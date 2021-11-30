const router = require("express").Router();
const {
  models: { User, Pill },
} = require("../db");
const Wallet = require("../db/models/Wallet");
module.exports = router;

// found at /api/dailypill
router.put("/", async (req, res, next) => {
  try {
    console.log(req.body)
    const walletItem = await Wallet.findOne({
      where: {
        userId: req.body.data.userId,
        pillId: req.body.data.pills,
      },
    });
    console.log(walletItem)
    await walletItem.update({
      dailyDosage: walletItem.dailyDosage - 1,
    });

    res.send(walletItem);
  } catch (error) {
    next(error);
  }
});
