const router = require("express").Router();
const {
  models: { User, Wallet },
} = require("../db");
module.exports = router;

// found at /api/wallet
router.get("/", async (req, res, next) => {
  try {
    const usersPills = await Wallet.findAll({
      where: {
        userId: req.body.id,
      },
    });
    res.json(usersPills);
  } catch (error) {
    next(error);
  }
});
