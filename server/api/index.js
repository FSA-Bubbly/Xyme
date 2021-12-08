const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/wallet', require('./wallet'));
router.use('/interactions', require('./interactions'));
router.use('/dailypill', require('./dailypill'));
router.use('/vision', require('./vision'));
router.use('/email', require('./email'));

router.use((req, res, next) => {
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
});
