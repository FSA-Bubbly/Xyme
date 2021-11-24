const router = require("express").Router();
const {
  models: { User, Wallet, Pill },
} = require("../db");

module.exports = router;

// found at /api/wallet
router.get("/:id", async (req, res, next) => {
  try {
    const pills = await Wallet.findAll({
      where: {
        userId: req.params.id
      },
      include: [Pill]
    })
    // pills.map()
    console.log('pills: ', pills)

    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.post("/add-pill", async (req, res, next) => {
  try {
    const { userId, pillName, dosage } = req.body;
    const user = await User.findByPk(userId);
    const [ databaseId ] = await Pill.findAll({
      where: {
        name: pillName
      }
    })
    // console.log(databaseId === undefined);
    if (databaseId === undefined) {
      console.log('make API call to NIH here for pill info');
    } else {
      user.addPill(databaseId.dataValues.id);
    }
    res.json('pill added!')
  } catch (error) {
    next(error);
  }
});
