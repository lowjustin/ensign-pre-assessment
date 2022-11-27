import express from "express";
import { UserFromDB } from "../types/custom";
var router = express.Router();
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

var auth = require("../handlers/auth");
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

  await User.findOne({
    where: { username: username },
  })
    .then((user: UserFromDB) => {
      bcrypt
        .compare(password, user.password)
        .then((passwordCheck: boolean) => {
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
            process.env.TOKEN_SECRET,
            { expiresIn: 3600 }
          );

          return res.status(200).json({
            message: "Login Successful",
            userId: user.id,
            username: user.username,
            token,
          });
        })
        .catch((err: Error) => {
          return res.status(401).json({
            error: errorMessage,
          });
        });
    })
    .catch((err: Error) => {
      return res.status(401).json({
        error: errorMessage,
      });
    });
});

// verify token
router.get("/verify", auth, async (req, res) => {
  const user = await req.user;
  try {
    if (user) {
      return res.status(200).json(user);
    }
  } catch (err) {
    return res.status(401).json({
      error: "Invalid token",
    });
  }
});

module.exports = router;
