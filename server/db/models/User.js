const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    },
  },
  password: {
    type: Sequelize.STRING
  },
  firstName: {
    type: Sequelize.STRING,
    validate: {
      properCase(name) {
        if (name[0] !== name[0].toUpperCase() &&
        name.slice(1,name[name.length -1]) !== name.slice(1,name[name.length -1]).toLowerCase()) {
          throw new Error('First name must be proper-case!')
        }
      }
    }
  },
  lastName: {
    type: Sequelize.STRING,
    validate: {
      properCase(name) {
        if (name[0] !== name[0].toUpperCase() &&
        name.slice(1,name[name.length -1]) !== name.slice(1,name[name.length -1]).toLowerCase()) {
          throw new Error('Last name must be proper-case!')
        }
      }
    }
  },
  age: {
    type: Sequelize.INTEGER
  },
  height: {
    type: Sequelize.INTEGER
  },
  weight: {
    type: Sequelize.INTEGER
  },
  imageUrl: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  }
})

module.exports = User;
