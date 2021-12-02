const router = require("express").Router();
const fetch = require("node-fetch");

const {
  models: { User, Pill, Interaction },
} = require("../db");

const baseUrl = 'https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=';

module.exports = router;

// GET /api/interactions/${user.id}
router.get("/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      include: [
        {model: Pill}
      ]
    });
    const pills = user.pills.map(pill => pill.dataValues)
    const rxcuiString = user.pills.map(pill => pill.dataValues.rxcui)
      .join('+');
    const response = await fetch(`${baseUrl}${rxcuiString}`)
    const parsedResponse = await response.json();
    const interactionsArr = parsedResponse.fullInteractionTypeGroup
      .map(obj => obj.fullInteractionType).flat().map(obj => (
        {
          med1: {
            rxcui: obj.minConcept[0].rxcui,
            name: obj.minConcept[0].name
          },
          med2: {
            rxcui: obj.minConcept[1].rxcui,
            name: obj.minConcept[1].name
          },
          interactionDesc: obj.interactionPair[0].description
        }
      )
    );

    const interactionsObjs = interactionsArr.map(obj => {
      let description = obj.interactionDesc;
      let userId = user.id;
      let med1Id, med2Id;
      pills.map(pill => {
        if (pill.rxcui === parseInt(obj.med1.rxcui)) {
          med1Id = pill.id
        }
        if (pill.rxcui === parseInt(obj.med2.rxcui)) {
          med2Id = pill.id
        }
    })
      return {
        interactionDesc: description,
        userId,
        med1Id,
        med2Id
      }
    })
    const checkInDb = await Promise.all (interactionsObjs
      .map(async obj => {
        let inDb = await Interaction.findOne({
          where: {
            interactionDesc: obj.interactionDesc,
            userId: obj.userId,
            med1Id: obj.med1Id,
            med2Id: obj.med2Id
          }
      })
      if (inDb === null) return obj;
    }));

    const addToDb = checkInDb.filter(ele => ele !== undefined);
    const intRes = await Interaction.bulkCreate(addToDb);

    res.json(intRes);
  } catch (error) {
    next(error);
  }
})
