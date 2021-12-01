const Sequelize = require('sequelize');
const db = require('../db');

const Interaction = db.define('interaction', {
	interactionDesc: {
		type: Sequelize.TEXT,
		allowNull: false,
		validate: {
			notEmpty: true,
		},
	},
});

module.exports = Interaction;
