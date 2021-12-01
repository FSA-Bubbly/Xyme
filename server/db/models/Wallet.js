const Sequelize = require("sequelize");
const db = require("../db");

const Wallet = db.define("wallet", {
  startDate: {
    type: Sequelize.DATE,
    defaultValue: new Date(),
  },
  expectedNextDate: {
    type: Sequelize.DATE,
    defaultValue: new Date(),
  },
  frequencyPerDay: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
  frequencyPerWeek: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  dailyDosage: { // daily dosage
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
});
// grab date, when date is 0000, isTaken gets reset to false.
// Wallet.prototype.pillTaken = async function () {
//   setTimeout(() => {
//     this.isTaken = false;
//   }, 24 * 60 * 60 * 60);
// };

// var d = new Date();
// d.setHours(0,0,0,0);

// // if date.now is equal to d, execute wallet.pillTaken()

module.exports = Wallet;
