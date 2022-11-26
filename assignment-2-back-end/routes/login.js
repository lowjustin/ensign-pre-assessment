var express = require("express");
var router = express.Router();
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

var { User } = require("../models/User");

// handle login and create token if valid
router.post("/", async (req, res) => {
  const { username, password } = req.body;
  let errorMessage = "Incorrect username or password";

  if (!username) {
    return res.status(401).send({
      error: errorMessage,
    });
  }

  await User.findOne({ where: { username: username } }).then((user) => {
    bcrypt
      .compare(password, user.password)
      .then((passwordCheck) => {
        if (!passwordCheck) {
          return res.status(401).send({
            error: errorMessage,
          });
        }

        const token = jwt.sign(
          {
            userId: user.id,
            username: user.username,
          },
          "RANDOM-TOKEN",
          { expiresIn: "365d" }
        );

        return res.status(200).json({
          message: "Login Successful",
          userId: user.id,
          username: user.username,
          token,
        });
      })
      .catch((err) => {
        return res.status(401).json({
          error: errorMessage,
        });
      });
  }).catch((err: Error) => {
    return res.status(401).json({
      error: errorMessage,
    });
  });
});

module.exports = router;
