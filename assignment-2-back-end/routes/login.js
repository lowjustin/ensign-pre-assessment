var bcrypt = require("bcryptjs");
var express = require("express");
var jwt = require("jsonwebtoken");
var router = express.Router();
var { User } = require("../models/User");
var auth = require("../handlers/auth");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  if (!username) {
    return res.status(401).send({
      error: "Incorrect username or password",
    });
  }

  await User.findOne({ where: { username: username } }).then((user) => {
    bcrypt
      .compare(password, user.password)
      .then((passwordCheck) => {
        if (!passwordCheck) {
          return res.status(401).send({
            error: "Incorrect username or password",
          });
        }

        const token = jwt.sign(
          {
            userId: user.id,
            username: user.username,
          },
          "RANDOM-TOKEN",
          { expiresIn: 300 }
        );

        res.status(200).send({
          message: "Login Successful",
          userId: user.id,
          username: user.username,
          token,
        });
      })
      .catch((error) => {
        res.status(401).send({
          error: "Incorrect username or password",
        });
      });
  });
});

router.get("/free", (req, res) => {
  res.json({ message: "You are free to access me anytime" });
});

// authentication endpoint
router.get("/auth", auth, (req, res) => {
  res.json({ message: "You are authorized to access me", user: req.user });
});

module.exports = router;
