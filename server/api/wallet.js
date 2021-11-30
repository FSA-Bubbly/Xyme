const router = require("express").Router();
const fetch = require("node-fetch");

const baseUrl = `https://rxnav.nlm.nih.gov/REST/rxcui.json?name=`;
const {
  models: { User, Pill },
} = require("../db");
const Wallet = require("../db/models/Wallet");

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
    // console.log(req.body);
    const {
      userId,
      pillName,
      dosage,
      startDate,
      expectedNextDate,
      frequencyPerDay,
      frequencyPerWeek,
    } = req.body;
    const user = await User.findByPk(userId);
    const [databaseId] = await Pill.findAll({
      where: {
        name: pillName,
      },
    });
    // if pill not in our Pill table
    if (databaseId === undefined) {
      // initial API call for RXCUI
      const response = await fetch(`${baseUrl}${pillName}`);
      const parsedResponse = await response.json();
      const rxcui = parsedResponse.idGroup.rxnormId;
      // if name of pill user entered returns nothing from NIH API call
      if (rxcui === undefined) {
        // const error = new Error("This medication does not exist!");
        return res
          .status(401)
          .json({ error: "This medication does not exist!" });
      }
      // API call for medication description
      const descResponse = await fetch(
        `https://connect.medlineplus.gov/service?mainSearchCriteria.v.cs=2.16.840.1.113883.6.88&mainSearchCriteria.v.c=${rxcui}&informationRecipient.languageCode.c=en&knowledgeResponseType=application/json`
      );
      const descJson = await descResponse.json();
      const description = descJson.feed.entry[0].summary._value;
      const addedPill = await Pill.create({
        name: pillName,
        description,
        rxcui,
      });

      const walletItem = await Wallet.create({
        userId: userId,
        pillId: addedPill.id,
        startDate: startDate,
        expectedNextDate: expectedNextDate,
        frequencyPerDay: Number(frequencyPerDay),
        frequencyPerWeek: Number(frequencyPerWeek),
      });

      return res.json(walletItem);
    }
    const userAlreadyHasPill = await user.hasPill(databaseId.dataValues.id);
    if (userAlreadyHasPill) {
      // const error = new Error("This medication is already in your wallet!");
      return res
        .status(402)
        .json({ error: "This medication is already in your wallet!" });
    }

    const walletItem = await Wallet.create({
      userId: userId,
      pillId: databaseId.dataValues.id,
      startDate: startDate,
      expectedNextDate: expectedNextDate,
      frequencyPerDay: Number(frequencyPerDay),
      frequencyPerWeek: Number(frequencyPerWeek),
    });
    res.json(walletItem);
  } catch (error) {
    console.log(error);
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
});
