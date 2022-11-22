const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { createUser } = require("../controllers/User");

/* GET users listing. */
router.get("/createTable", async (req, res) => {
  await User.sync({ force: true });
  res.send("The table for the User model was just (re)created!");
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    return res.status(400).send({
      error: "Missing username",
    });
  }

  const user = await createUser(username, password);
  console.log(user.toJSON());
  res.json(user);
});

module.exports = router;
