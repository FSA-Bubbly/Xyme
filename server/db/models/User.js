const Sequelize = require('sequelize');
const db = require('../db');
const Pill = require('./Pill');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var cron = require('node-cron');
require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER;
const client = require('twilio')(accountSid, authToken);

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
	sms: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
	},
	phone: {
		type: Sequelize.STRING,
		unique: false,
		defaultValue: '',
		validation: {
			len: [12],
		},
	},
	morningReminder: {
		type: Sequelize.STRING,
		defaultValue: '08:00',
	},
	nighttimeReminder: {
		type: Sequelize.STRING,
		defaultValue: '17:00',
	},
	password: {
		type: Sequelize.STRING,
		validate: {
			notEmpty: true,
			len: [8, 200],
		},
	},
	firstName: {
		type: Sequelize.STRING,
		validate: {
			notEmpty: true,
			isAlpha: true,
		},
	},
	lastName: {
		type: Sequelize.STRING,
		validate: {
			notEmpty: true,
			isAlpha: true,
			len: [2],
		},
	},
	age: {
		type: Sequelize.INTEGER,
		validate: {
			notEmpty: true,
			min: 18,
			max: 110,
		},
	},
	height: {
		type: Sequelize.INTEGER,
		validate: {
			notEmpty: true,
			isNumeric: true,
			min: 20,
			max: 120,
		},
	},
	weight: {
		type: Sequelize.INTEGER,
		validate: {
			notEmpty: true,
			isNumeric: true,
			min: 10,
			max: 500,
		},
	},
	avatar: {
		type: Sequelize.STRING,
		defaultValue: '/user1.svg',
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
	email = email.toLowerCase();
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

User.hasAccount = async function ({ email }) {
	const user = await this.findOne({
		where: { email },
	});
	if (!user) {
		const error = Error('An account with this email was not found');
		error.status = 401;
		throw error;
	}
	return user;
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

const infoFormat = (user) => {
	user.email = user.email.toLowerCase();
	user.firstName =
		user.firstName[0].toUpperCase() + user.firstName.substring(1).toLowerCase();
	user.lastName =
		user.lastName[0].toUpperCase() + user.lastName.substring(1).toLowerCase();
};

const hashPassword = async (user) => {
	//in case the password has been changed, we want to encrypt it with bcrypt
	if (user.changed('password')) {
		user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
	}
};

const callCronTask = (user) => {
	const task = cron.schedule('0 0 0 * * *', async () => {
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
	});
	task.start();
};

const sendText = async (user) => {
	const twilioPhone = twilioNumber;
	const userName = await user.firstName;
	const userPhone = await user.phone;
	const userPills = await user.getPills();
	const pillNamesMorning = userPills
		.filter((pill) => {
			if (
				pill.wallet.frequencyPerDay === 1 ||
				pill.wallet.frequencyPerDay === 2
			) {
				return pill;
			}
		})
		.map((pill) => pill.name);
	const pillNamesNight = userPills
		.filter((pill) => {
			if (pill.wallet.frequencyPerDay === 2) {
				return pill;
			}
		})
		.map((pill) => pill.name);

	if (user.morningReminder !== null) {
		const userMorning = await user.morningReminder.split(':');
		const message = cron.schedule(
			`${userMorning[1]} ${userMorning[0]} * * * `,
			() => {
				try {
					client.messages
						.create({
							body: `Hi ${userName}, here are your morning pills for today: ${pillNamesMorning}. Before you start your day, log into your account at https://fsa-xyme.herokuapp.com/ to record your taken pills!`,
							from: twilioPhone,
							to: `+1${userPhone}`,
						})
						.then((message) => console.log(message.body))
						.catch((err) => console.log(err));
				} catch (error) {
					next(error);
				}
			},
			{
				scheduled: false,
			}
		);
		if (userPhone !== undefined && user.sms === true) {
			message.start();
		} else if (user.sms === false) {
			message.stop();
		}
	}
	if (user.nighttimeReminder !== null) {
		const userNight = await user.nighttimeReminder.split(':');
		const message = cron.schedule(
			`${userNight[1]} ${userNight[0]} * * * `,
			() => {
				try {
					client.messages
						.create({
							body: `Hi ${userName}, here are your night pills for today: ${pillNamesNight}. Before you go to bed, log into your account at https://fsa-xyme.herokuapp.com/ to record your taken pills!`,
							from: twilioPhone,
							to: `+1${userPhone}`,
						})
						.then((message) => console.log(message.body))
						.catch((err) => console.log(err));
				} catch (error) {
					next(error);
				}
			},
			{
				scheduled: false,
			}
		);
		if (userPhone !== undefined && user.sms === true) {
			message.start();
		} else if (user.sms === false) {
			message.stop();
		}
	}
};
User.beforeCreate(infoFormat);
User.beforeUpdate(infoFormat);
User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.afterCreate(callCronTask);
User.afterCreate(sendText);
User.afterUpdate(sendText);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));
