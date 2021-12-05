const Sequelize = require("sequelize");
const db = require("../db");

const Request = db.define("request", {
  uuid: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: Sequelize.TEXT,
  },
});

Request.getResetRequest = async function (id) {
  const request = await this.findOne({
    where: { uuid: id },
  });

  if (!request) {
    const error = Error("An account with this email was not found");
    error.status = 401;
    throw error;
  }
  return request;
};

module.exports = Request;
