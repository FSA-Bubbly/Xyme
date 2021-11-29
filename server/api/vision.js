const router = require('express').Router();
const vision = require('@google-cloud/vision');
process.env.GOOGLE_APPLICATION_CREDENTIALS = 'APIKey.json';

module.exports = router;

router.put('/', async (req, res, next) => {
	try {
		const client = new vision.ImageAnnotatorClient();
		console.log(req.files);
		const [result] = await client.textDetection('../Xyme/public/pill.png');
		const detections = result.textAnnotations;
		const filteredDetections = detections.reduce((accumulator, currentVal) => {
			if (currentVal.description === currentVal.description.toUpperCase()) {
				accumulator.push(currentVal.description);
			}
			return accumulator;
		}, []);
		console.log(filteredDetections);
		res.json(filteredDetections);
	} catch (err) {
		next(err);
	}
});
