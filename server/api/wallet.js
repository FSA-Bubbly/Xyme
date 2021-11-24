const router = require("express").Router();
const {
  models: { User, Pill },
} = require("../db");

module.exports = router;

// found at /api/wallet/userId
router.get("/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    const userPills = await user.getPills();
    const pills = userPills.map(pill => pill.dataValues)
    res.json(pills);
  } catch (error) {
    next(error);
  }
});

// /api/wallet/add-pill
router.post("/add-pill", async (req, res, next) => {
  try {
    const { userId, pillName, dosage } = req.body;
    const user = await User.findByPk(userId);
    const [ databaseId ] = await Pill.findAll({
      where: {
        name: pillName
      }
    })
    if (databaseId === undefined) {
      console.log('make API call to NIH here for pill info');
    } else {
      user.addPill(databaseId.dataValues.id);
    }
    res.json(databaseId.dataValues.id)
  } catch (error) {
    next(error);
  }
});
