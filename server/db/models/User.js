const Sequelize = require('sequelize');
const db = require('../db');
const Pill = require('./Pill');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const Wallet = require("./Wallet");

var cron = require('node-cron');

const SALT_ROUNDS = 5;

const User = db.define('user', {
	email: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false,
		validate: {
			isEmail: true,
		},
	},
	password: {
		type: Sequelize.STRING,
	},
	firstName: {
		type: Sequelize.STRING,
		validate: {
			properCase(name) {
				if (
					name[0] !== name[0].toUpperCase() &&
					name.slice(1, name[name.length - 1]) !==
						name.slice(1, name[name.length - 1]).toLowerCase()
				) {
					throw new Error('First name must be proper-case!');
				}
			},
		},
	},
	lastName: {
		type: Sequelize.STRING,
		validate: {
			properCase(name) {
				if (
					name[0] !== name[0].toUpperCase() &&
					name.slice(1, name[name.length - 1]) !==
						name.slice(1, name[name.length - 1]).toLowerCase()
				) {
					throw new Error('Last name must be proper-case!');
				}
			},
		},
	},
	age: {
		type: Sequelize.INTEGER,
		validate: {
			min: 10,
			max: 100,
		},
	},
	height: {
		type: Sequelize.INTEGER,
		validate: {
			isNumeric: true,
		},
	},
	weight: {
		type: Sequelize.INTEGER,
		validate: {
			isNumeric: true,
		},
	},
	avatar: {
		type: Sequelize.STRING,
		defaultValue: '/user1.svg',
		validate: {
			isIn: [
				[
					'/user1.svg',
					'/user2.svg',
					'/user3.svg',
					'/user4.svg',
					'/user5.svg',
					'/user6.svg',
					'/user7.svg',
					'/user8.svg',
					'/user9.svg',
				],
			],
		},
	},
});

module.exports = User;

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
	//we need to compare the plain version to an encrypted version of the password
	return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function () {
	return jwt.sign({ id: this.id }, process.env.JWT);
};

/**
 * classMethods
 */
User.authenticate = async function ({ email, password }) {
	const user = await this.findOne({
		where: { email },
		include: { model: Pill },
	});
	if (!user || !(await user.correctPassword(password))) {
		const error = Error('Incorrect userEmail/password');
		error.status = 401;
		throw error;
	}
	return user.generateToken();
};

User.nodeReset = async function () {
	console.log(this);
};

User.findByToken = async function (token) {
	try {
		const { id } = await jwt.verify(token, process.env.JWT);
		const user = User.findOne({ where: { id: id }, include: { model: Pill } });
		if (!user) {
			throw 'nooo';
		}
		return user;
	} catch (ex) {
		const error = Error('bad token');
		error.status = 401;
		throw error;
	}
};

/**
 * hooks
 */
const hashPassword = async (user) => {
	//in case the password has been changed, we want to encrypt it with bcrypt
	if (user.changed('password')) {
		user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
	}
};

const callCronTask = (user) => {
	const task = cron.schedule(
		'0 0 0 * * *',
		async () => {
			try {
				const userPills = await user.getPills();
				userPills.map((pill) => {
					const updateDosage = pill.wallet;
					updateDosage.update({ dailyDosage: updateDosage.frequencyPerDay });
					return pill.dataValues;
				});
			} catch (error) {
				next(error);
			}
		},
		{}
	);
	task.start();
};
User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.afterCreate(callCronTask);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));

// const helloworld = () => {
//   console.log("hello");
//   return "hello";
// };

// const result = helloworld();
// console.log("this is the result", result);
