//this is the access point for all things database related!

const db = require('./db')

const Pill = require('./models/Pill')
const User = require('./models/User')
const Wallet = require('./models/Wallet')

Pill.belongsToMany(User, { through: Wallet })
User.belongsToMany(Pill, { through: Wallet });

module.exports = {
  db,
  models: {
    Pill,
    User,
    Wallet
  },
}
