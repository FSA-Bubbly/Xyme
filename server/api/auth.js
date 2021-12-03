const router = require('express').Router();
const {
	models: { User },
} = require('../db');

const requireToken = async (req, res, next) => {
	try {
		const token = req.headers.authorization;
		console.log('requireToken', token);
		const user = await User.findByToken(token);
		req.user = user;
		if (req.user) {
			next();
		} else {
			throw Error('You are not authorized to view this');
		}
	} catch (error) {
		next(error);
	}
};

module.exports = requireToken;
