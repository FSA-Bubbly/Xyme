const router = require("express").Router();
const fetch = require("node-fetch");

const baseUrl = `https://rxnav.nlm.nih.gov/REST/rxcui.json?name=`;
const {
  models: { User, Pill },
} = require("../db");

module.exports = router;

// found at /api/wallet/userId
router.get("/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    const userPills = await user.getPills();
    const pills = userPills.map((pill) => pill.dataValues);
    res.json(pills);
  } catch (error) {
    next(error);
  }
});

// found at /api/wallet/select/pillId
router.get("/select/:pillId", async (req, res, next) => {
  try {
    const singlePill = await Pill.findByPk(req.params.pillId);
    res.send(singlePill);
  } catch (error) {
    next(error);
  }
});

// /api/wallet/add-pill
router.post("/add-pill", async (req, res, next) => {
  try {
    const { userId, pillName, dosage } = req.body;
    const user = await User.findByPk(userId);
    const [databaseId] = await Pill.findAll({
      where: {
        name: pillName,
      },
    });
    if (databaseId === undefined) {
      //console.log('make API call to NIH here for pill info');
      const response = await fetch(`${baseUrl}${pillName}`);
      const parsedResponse = await response.json();
      // make separate api call here to pull medication description
      const rxcui = parsedResponse.idGroup.rxnormId;
      const descResponse = await fetch(
        `https://connect.medlineplus.gov/service?mainSearchCriteria.v.cs=2.16.840.1.113883.6.88&mainSearchCriteria.v.c=${rxcui}&informationRecipient.languageCode.c=en&knowledgeResponseType=application/json`
      );
      const descJson = await descResponse.json();
      const description = descJson.feed.entry[0].summary._value;
      if (rxcui === undefined) {
        const error = Error("This medication does not exist!");
        return res.status(401).send(error);
      }
      const addedPill = await Pill.create({
        name: pillName,
        description,
        rxcui,
      });
      user.addPill(addedPill.id);
      return res.json(addedPill.id);
    }
    user.addPill(databaseId.dataValues.id);
    res.json(databaseId.dataValues.id);
  } catch (error) {
    next(error);
  }
});
