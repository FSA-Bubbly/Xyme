
const Sequelize = require("sequelize");
const db = require("../db");
const Pill = require("./Pill");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// const Wallet = require("./Wallet");

var cron = require("node-cron");
require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const SALT_ROUNDS = 5;

const User = db.define("user", {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  phone: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: true,
  },
  morningReminder: {
    type: Sequelize.STRING,
  },
  nighttimeReminder: {
    type: Sequelize.STRING,
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
          throw new Error("First name must be proper-case!");
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
          throw new Error("Last name must be proper-case!");
        }
      },
    },
  },
  age: {
    type: Sequelize.INTEGER,
  },
  height: {
    type: Sequelize.INTEGER,
  },
  weight: {
    type: Sequelize.INTEGER,
  },
  avatar: {
    type: Sequelize.STRING,
    defaultValue: "/user1.svg",
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

  const task = cron.schedule("0 0 0 * * *", async () => {
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
    const userMorning = user.morningReminder.split(":");
    const message = cron.schedule(
      `${userMorning[1]} ${userMorning[0]} * * * `,
      () => {
        try {
          client.messages
            .create({
              body: `Hi ${userName}, here are your morning pills for today: ${pillNamesMorning}`,
              from: "+14325276394",
              to: `+1${userPhone}`,
            })
            .then((message) => console.log(message.body))
            .catch((err) => console.log(err));
        } catch (error) {
          next(error);
        }
      }
    );
    if (userPhone !== undefined || userPhone !== null) {
      message.start();
    }
  }
  if (user.nighttimeReminder !== null) {
    const userNight = await user.nighttimeReminder.split(":");
    const message = cron.schedule(
      `${userNight[1]} ${userNight[0]} * * * `,
      () => {
        try {
          client.messages
            .create({
              body: `Hi ${userName}, here are your night pills for today: ${pillNamesNight}`,
              from: "+14325276394",
              to: `+1${userPhone}`,
            })
            .then((message) => console.log(message.body))
            .catch((err) => console.log(err));
        } catch (error) {
          next(error);
        }
      }
    );
    if (userPhone !== undefined || userPhone !== null) {
      message.start();
    }
  }
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.afterCreate(callCronTask);
User.afterCreate(sendText);
User.afterUpdate(sendText);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));
