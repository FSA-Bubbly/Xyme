//this is the access point for all things database related!

const db = require("./db");

const Interaction = require("./models/Interaction");
const Pill = require("./models/Pill");
const User = require("./models/User");
const Wallet = require("./models/Wallet");
const Request = require("./models/Request");

Pill.belongsToMany(User, { through: Wallet });
User.belongsToMany(Pill, { through: Wallet });
User.hasMany(Interaction);
Interaction.belongsTo(User);
Interaction.belongsTo(Pill, { as: "med1" });
Interaction.belongsTo(Pill, { as: "med2" });

module.exports = {
  db,
  models: {
    Interaction,
    Pill,
    User,
    Wallet,
    Request,
  },
};
