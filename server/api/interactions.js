const router = require('express').Router();
const fetch = require('node-fetch');
const requireToken = require('./auth');
const { Op } = require("sequelize");

const {
	models: { User, Pill, Interaction },
} = require('../db');

module.exports = router;

// GET /api/interactions/${user.id}
router.get("/:userId", requireToken, async (req, res, next) => {
  try {
    const allInteractions = await Interaction.findAll({
      where: {
        userId: req.params.userId
      },
      include: [
        {
          model: Pill,
          as: 'med1'
        },
        {
          model: Pill,
          as: 'med2'
        }
      ]
    });
    res.json(allInteractions);
  } catch (error) {
    next(error);
  }
})

// POST /api/interactions/
router.post("/", requireToken, async (req, res, next) => {
  try {
    const baseUrl = 'https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=';
    const user = await User.findByPk(req.body.id, {
      include: [
        {model: Pill}
      ]
    });
    if (user.pills.length < 2) {
      return res.json([])
    }
    const rxcuiString = user.pills.map(pill => pill.dataValues.rxcui)
      .join('+');
    const response = await fetch(`${baseUrl}${rxcuiString}`)
    const parsedResponse = await response.json();
    const interactionsArr = parsedResponse.fullInteractionTypeGroup
      .map(obj => obj.fullInteractionType).flat().map(obj => (
        {
          userId: user.id,
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
      user.pills.map(pill => {
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

    const interactions = Promise.all(interactionsObjs.map(async obj => {
      const exists = await Interaction.findOne({
        where: {
          interactionDesc: obj.interactionDesc,
          userId: obj.userId,
          med1Id: obj.med1Id,
          med2Id: obj.med2Id
        }
      })
      if (exists === null) return await user.createInteraction(obj)
    }))

    res.json(interactions);
  } catch (error) {
    next(error);
  }
})

router.delete(`/remove`, requireToken, async (req, res, next) => {
  try {
    const interactions = await Promise.all(req.body.pills.map(int => {
      const interaction = Interaction.findAll({
        where: {
          [Op.or]: [
            { med1Id: int },
            { med2Id: int }
          ],
          userId: req.body.userId
        }
      })
      return interaction;
    }))

    const intIds = interactions.flat().map(int => int.dataValues.id);

    const destroyInts = await Promise.all(intIds.map(intId => {
      const destroyedInt = Interaction.destroy({
        where: {
          id: intId
        }
      })
    }))
    res.json(intIds)
  } catch (error) {
    next(error);
  }
})
