const Sequelize = require('sequelize');
const db = require('../db');

const PillConflict = db.define('pillConflict', {
	rxcui1: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			notEmpty: true,
		},
	},
	rxcui2: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			notEmpty: true,
		},
	},
	conflictDescription: {
		type: Sequelize.TEXT,
		allowNull: false,
		validate: {
			notEmpty: true,
		},
	},
});

module.exports = PillConflict;
