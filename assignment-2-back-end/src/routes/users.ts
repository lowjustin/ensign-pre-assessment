import express from "express";
const router = express.Router();
const { createUser, createUserTable } = require("../controllers/User");

// create table
router.get("/createUserTable", async (req, res) => {
  try {
    await createUserTable();
    res.send("The table for the User model was just created");
  } catch (err) {
    console.error(err);
  }
});

// create user
router.post("/", async (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    return res.status(400).json({
      error: "Missing username",
    });
  }

  try {
    const user = await createUser(username, password);
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({
      error: "Could not create user",
    });
  }
});

module.exports = router;
