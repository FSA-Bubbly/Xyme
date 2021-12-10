const router = require('express').Router();
const axios = require('axios');
const key = process.env.GOOGLE_KEY;
const multer = require('multer');
const fetch = require('node-fetch-retry');
const requireToken = require('./auth');
const upload = multer();

module.exports = router;

router.post(
	'/',
	requireToken,
	upload.single('file'),
	async (req, res, next) => {
		try {
			const { file } = req;
			const pills = [];

			const base64 = file.buffer.toString('base64');
			const rxUrl = `https://rxnav.nlm.nih.gov/REST/rxcui.json?name=`;

			const url =
				`https://vision.googleapis.com/v1/images:annotate` + `?key=${key}`;

			const results = await axios.post(url, {
				requests: [
					{
						image: {
							content: base64,
						},
						features: [
							{
								type: 'DOCUMENT_TEXT_DETECTION',
							},
						],
					},
				],
			});

			const code =
				results.data.responses[0].fullTextAnnotation.text.split(/\s+/g);
			const regex = /(\b[A-Z]+\b)/g;
			//Retrieve all the words with capital letters
			const filteredDetections = code.reduce((accumulator, currentVal) => {
				if (currentVal.match(regex) && currentVal.length > 2) {
					accumulator.push(currentVal);
				}
				return accumulator;
			}, []);
			// Gets the rxnormId
			for (const value of filteredDetections) {
				const response = await fetch(`${rxUrl}${value}`);
				const parseResponse = await response.json();
				if (parseResponse.idGroup.rxnormId) {
					pills.push(parseResponse.idGroup);
				}
			}
			res.json(pills);
		} catch (err) {
			next(err);
		}
	}
);
