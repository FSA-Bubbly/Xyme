const Sequelize = require('sequelize');
const db = require('../db');

const Pill = db.define('pill', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
		},
	},
	description: {
		type: Sequelize.STRING,
	},
	rxcui: {
		type: Sequelize.INTEGER,
		// allowNull: false,
		// validate: {
		// 	notEmpty: true,
		// },
	},
});

module.exports = Pill;
