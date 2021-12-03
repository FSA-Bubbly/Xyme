const router = require('express').Router();
process.env.GOOGLE_APPLICATION_CREDENTIALS = 'APIKey.json';
const fs = require('fs').promises;
const axios = require('axios');
const key = 'AIzaSyC45clx_xZgEuF5gCSn9_ZQ8lhtRm0_R74';
const multer = require('multer');
const fetch = require('node-fetch');
const requireToken = require('./auth');

module.exports = router;

const upload = multer();
router.post(
	'/',
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
			console.log(filteredDetections);
			// Gets the rxnormId
			for (const value of filteredDetections) {
				const response = await fetch(`${rxUrl}${value}`);
				const parseResponse = await response.json();
				if (parseResponse.idGroup.rxnormId) {
					pills.push(parseResponse.idGroup);
				}
			}

			console.log(pills);
			res.json(pills);
		} catch (err) {
			next(err);
		}
	}
);
