const Sequelize = require("sequelize");
const db = require("../db");

const Wallet = db.define("wallet", {
  // startDate: {
  //   type: Sequelize.DATE,
  //   defaultValue: new Date(),
  // },
  // expectedNextDate: {
  //   type: Sequelize.DATE,
  //   defaultValue: new Date(),
  // },
  // frequencyPerDay: {
  //   type: Sequelize.INTEGER,
  //   defaultValue: 1,
  // },
  // frequencyPerWeek: {
  //   type: Sequelize.INTEGER,
  //   defaultValue: 0,
  // },
});

module.exports = Wallet;
