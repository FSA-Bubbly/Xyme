const router = require('express').Router();
const fetch = require('node-fetch-retry');
const requireToken = require('./auth');

const baseUrl = `https://rxnav.nlm.nih.gov/REST/rxcui.json?name=`;
const {
	models: { User, Pill },
} = require('../db');
const Wallet = require('../db/models/Wallet');

module.exports = router;

// found at /api/wallet/userId

router.get('/:userId', async (req, res, next) => {
	try {
		const user = await User.findByPk(req.params.userId);
		const userPills = await user.getPills();

		//pills
		const pills = userPills.map((pill) => {
			return pill.dataValues;
		});

		res.json(pills);
	} catch (error) {
		next(error);
	}
});

router.get('/select/:pillId', requireToken, async (req, res, next) => {
	try {
		const singlePill = await Pill.findByPk(req.params.pillId);
		res.send(singlePill);
	} catch (error) {
		next(error);
	}
});

// /api/wallet/add-pill
router.post('/add-pill', requireToken, async (req, res, next) => {
	try {
		const { userId, pillName, startDate, endDate, frequencyPerDay } = req.body;
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
			if (rxcui === undefined) throw new Error('Not Found');

			// API call for medication description
			let descResponse;
			try {
				descResponse = await fetch(
					`https://connect.medlineplus.gov/service?mainSearchCriteria.v.cs=2.16.840.1.113883.6.88&mainSearchCriteria.v.c=${rxcui}&informationRecipient.languageCode.c=en&knowledgeResponseType=application/json`
				);
			} catch (error) {}
			const descJson = await descResponse.json();
			const description = descJson.feed.entry[0].summary._value;

			const conceptName = descJson.feed.entry[0].title._value;
			//API call for medication image
			const imageResponse = await fetch(
				`https://rximage.nlm.nih.gov/api/rximage/1/rxbase?name=${conceptName}`
			);
			const imageJson = await imageResponse.json();
			var image = '/pill2.svg';

			if (imageJson.nlmRxImages.length !== 0) {
				image = imageJson.nlmRxImages[0].imageUrl;
			}

			const addedPill = await Pill.create({
				name: pillName,
				description,
				image,
				rxcui,
			});

			const walletItem = await Wallet.create({
				userId: userId,
				pillId: addedPill.id,
				startDate: startDate,
				endDate: endDate,
				frequencyPerDay: Number(frequencyPerDay),
				dailyDosage: Number(frequencyPerDay),
			});

			return res.json(walletItem);
		}
		const userAlreadyHasPill = await user.hasPill(databaseId.dataValues.id);
		if (userAlreadyHasPill) throw new Error('Duplicate');

		const walletItem = await Wallet.create({
			userId: userId,
			pillId: databaseId.dataValues.id,
			startDate: startDate,
			endDate: endDate,
			frequencyPerDay: Number(frequencyPerDay),
			dailyDosage: Number(frequencyPerDay),
		});
		res.json(walletItem);
	} catch (error) {
		if (error.message === 'Not Found')
			return res.status(401).json({ error: 'This medication does not exist!' });
		if (error.message === 'Duplicate')
			return res
				.status(402)
				.json({ error: 'This medication is already in your wallet!' });
		next(error);
	}
});

router.put(`/pill/edit`, requireToken, async (req, res, next) => {
	try {
		const { userId, pillId, startDate, endDate, frequencyPerDay } = req.body.pill;
		const pillToEdit = await Wallet.findOne({
			where: {
				userId,
				pillId
			}
		})
		res.send(await pillToEdit.update({
			startDate,
			endDate,
			frequencyPerDay,
			dailyDosage: frequencyPerDay
		}))
	} catch (error) {
		next(error)
	}
})

router.delete(`/:userId/remove`, requireToken, async (req, res, next) => {
	try {
		const user = await User.findByPk(req.params.userId);
		const pills = req.body.pills;
		await user.removePills(pills);
		res.json(pills);
	} catch (error) {
		next(error);
	}
});
