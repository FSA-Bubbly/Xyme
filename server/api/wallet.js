const router = require("express").Router();
const {
  models: { User, Wallet, Pill },
} = require("../db");

module.exports = router;

// found at /api/wallet
router.get("/", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.body.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.post("/add-pill", async (req, res, next) => {
  try {
    const pillToAdd = req.params;
    console.log(pillToAdd);
  } catch (error) {
    next(error);
  }
});
