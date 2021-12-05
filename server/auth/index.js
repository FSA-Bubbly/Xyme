const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");

const bcrypt = require("bcrypt");
const SALT_ROUNDS = 5;

const sendResetLink = require("../resetRequest");
const {
  models: { User, Request },
} = require("../db");
const { hasAccount } = require("../db/models/User");
const { getResetRequest } = require("../db/models/Request");

module.exports = router;

router.post("/login", async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const {
      first,
      last,
      age,
      height,
      weight,
      email,
      sms,
      phone,
      morningReminder,
      nighttimeReminder,
      password,
      avatar,
    } = req.body;

    const user = await User.create({
      firstName: first,
      lastName: last,
      age: age,
      weight: weight,
      height: height,
      email,
      sms,
      phone,
      morningReminder,
      nighttimeReminder,
      password,
      avatar: avatar,
    });
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.get("/me", async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});
router.post("/forgot", async (req, res, next) => {
  try {
    const user = await User.hasAccount(req.body);
    if (user) {
      const id = uuidv4();
      const request = {
        uuid: id,
        email: user.email,
      };
      const newrequest = Request.create(request);
      sendResetLink(user.email, id);
    }
    res.status(200).json;
  } catch (ex) {
    next(ex);
  }
});

router.put("/reset/:id", async (req, res, next) => {
  try {
    console.log(req.body.password);
    const thisRequest = await Request.getResetRequest(req.body.id);
    if (thisRequest) {
      const user = await User.hasAccount({ email: thisRequest.email });

      user.update({ password: req.body.password });
      console.log(user.password);

      res.status(204).json();
    } else {
      res.status(204).json();
    }
  } catch (ex) {
    next(ex);
  }
});
