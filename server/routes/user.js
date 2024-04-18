const express = require("express");
const router = express.Router();
const urModel = require("../models/users");

router.use(express.json());

router.post("/", async (req, res) => {
  try {
    const { chatId, name } = req.body;
    console.log(name);
    // Check if user with the provided chatId already exists
    let existingUser = await urModel.findOne({ chatId });

    if (existingUser) {
      // If user exists, update the user's data
      existingUser.name = name;
      await existingUser.save();
      res.send("User data updated successfully");
    } else {
      // If user does not exist, create a new user
      const newUser = new urModel({
        chatId: chatId,
        name: name,
      });

      await newUser.save();
      res.send("User created successfully");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating/updating user");
  }
});

router.get("/", (res, req) => {
  res.send("User List");
});

router.get("/new", (res, req) => {
  res.send("new user");
});

router.get("/:id", (req, res) => {
  res.send(`Get user with ID ${req.params.id}`);
});

module.exports = router;
