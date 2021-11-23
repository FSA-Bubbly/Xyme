//this is the access point for all things database related!

const db = require('./db');

const Pill = require('./models/Pill');
const User = require('./models/User');
const Wallet = require('./models/Wallet');
const PillConflict = require('./models/PillConflict');

Pill.belongsToMany(User, { through: Wallet });
User.belongsToMany(Pill, { through: Wallet });
User.hasMany(PillConflict);
PillConflict.belongsTo(User);

module.exports = {
	db,
	models: {
		Pill,
		User,
		Wallet,
		PillConflict,
	},
};
