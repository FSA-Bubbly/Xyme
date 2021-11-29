const router = require("express").Router();
const fetch = require('node-fetch');

const baseUrl = `https://rxnav.nlm.nih.gov/REST/rxcui.json?name=`

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
      const response = await fetch(`${baseUrl}${pillName}`)
      const parsedResponse = await response.json();
      // make separate api call here to pull medication description?
      const rxcui = parsedResponse.idGroup.rxnormId;
      if (rxcui === undefined) {
        const error = Error('This medication does not exist!')
        return res.status(401).send(error);
      }
      const addedPill = await Pill.create({
        name: pillName,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        rxcui
      })
      console.log(addedPill);
      user.addPill(addedPill.id);
      return res.json(addedPill);
    }
    user.addPill(databaseId.dataValues.id);
    res.json(databaseId.dataValues)
  } catch (error) {
    next(error);
  }
});

router.delete(`/:userId/remove`, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    const pills = req.body.pills;
    await user.removePills(pills);
    res.json(pills);
  } catch (error) {
    next(error);
  }
})
