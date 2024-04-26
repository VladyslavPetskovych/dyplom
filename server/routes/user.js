const express = require("express");
const router = express.Router();
const urModel = require("../models/users");

router.use(express.json());

router.post("/", async (req, res) => {
  try {
    const { chatId, name } = req.body;
    console.log(name);
    let existingUser = await urModel.findOne({ chatId });
    if (existingUser) {
      existingUser.name = name;
      await existingUser.save();
      res.send("User data updated successfully");
    } else {
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

router.get("/:chatId", async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const user = await urModel.findOne({ chatId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    console.error("Error retrieving user data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/answer", async (req, res) => {
  try {
    const { chatId, questionId, answer } = req.query;

    // Check if chatId and questionId are provided
    if (!chatId || !questionId || !answer) {
      return res.status(400).json({ message: "chatId, questionId, and answer are required" });
    }

    // Find the user by chatId
    const user = await urModel.findOne({ chatId });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user's answers object with the new answer
    user.answers[questionId] = answer;

    // Save the updated user data
    await user.save();

    res.json({ message: "Answer added successfully" });
  } catch (error) {
    console.error("Error adding answer:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



module.exports = router;
