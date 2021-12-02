const Sequelize = require("sequelize");
const db = require("../db");

const Wallet = db.define("wallet", {
  startDate: {
    type: Sequelize.DATE,
    defaultValue: new Date(),
  },
  endDate: {
    type: Sequelize.DATE,
    defaultValue: new Date(),
  },
  frequencyPerDay: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
  dailyDosage: { // daily dosage
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
});


module.exports = Wallet;
