const router = require('express').Router();
process.env.GOOGLE_APPLICATION_CREDENTIALS = 'APIKey.json';
const fs = require('fs').promises;
const axios = require('axios');
const key = 'AIzaSyC45clx_xZgEuF5gCSn9_ZQ8lhtRm0_R74';

module.exports = router;

router.put('/', async (req, res, next) => {
	try {
		const image = await fs.readFile(
			'/home/ec2-user/environment/FullStack/Xyme/public/pill.png'
		);
		const base64 = image.toString('base64');

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

		const code = results.data.responses[0].fullTextAnnotation.text.split('\n');
		console.log(code);
		const filteredDetections = code.reduce((accumulator, currentVal) => {
			if (currentVal === currentVal.toUpperCase()) {
				accumulator.push(currentVal);
			}
			return accumulator;
		}, []);
		console.log(filteredDetections);
		res.json(filteredDetections);
	} catch (err) {
		next(err);
	}
});
