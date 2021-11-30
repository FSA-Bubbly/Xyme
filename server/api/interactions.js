const router = require("express").Router();
const fetch = require("node-fetch");

const {
  models: { User, Pill },
} = require("../db");

const baseUrl = 'https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=';
// RXCUIs provided come after the '=' above, separated by +s
const format = '207106+152923+656659';

module.exports = router;

// GET /api/interactions/${user.id}
router.get("/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      include: [
        {model: Pill}
      ]
    });
    const rxcuiString = user.pills.map(pill => pill.dataValues.rxcui)
      .join('+');
    const response = await fetch(`${baseUrl}${rxcuiString}`)
    const parsedResponse = await response.json();
    const interactionPairs = parsedResponse.fullInteractionTypeGroup.map(x => x.fullInteractionType).flat().map(obj => obj.interactionPair).flat();

    console.log(interactionPairs);
  } catch (error) {
    next(error);
  }
})
