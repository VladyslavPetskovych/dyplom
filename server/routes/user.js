const express = require("express");
const router = express.Router();
const urModel = require("../models/users");

router.use(express.json());


router.post("/", async (req, res) => {
  try {
    const { chatId, name } = req.body;
    console.log(name + " route is running for initializing user!");

    let existingUser = await urModel.findOne({ chatId });

    if (existingUser) {
      return res.status(200).send("User already exists");
    } else {
      const newUser = new urModel({
        chatId: chatId,
        name: name,
      });

      await newUser.save();
      res.send("User created successfully with name: " + name);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error initializing user");
  }
});

router.post("/edit", async (req, res) => {
  try {
    const { chatId, name } = req.body;
    console.log(name + " route is running for editing user's name!");

    // Find the user by chatId
    let existingUser = await urModel.findOne({ chatId });

    if (!existingUser) {
      return res.status(404).send("User not found");
    } else {
      // Update the user's name
      existingUser.name = name;
      await existingUser.save();
      res.send("User's name updated successfully to: " + name);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error editing user's name");
  }
});

router.get("/all", async (req, res) => {
  try {
    const userss = await urModel.find();
    res.json({ userss });
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/getUser/:chatId", async (req, res) => {
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

router.post("/answer", async (req, res) => {
  try {
    const { chatId, questionId, answer } = req.body;

    console.log("Received data:", { chatId, questionId, answer });

    // Check if chatId, questionId, and answer are provided
    if (!chatId || !questionId || !answer) {
      return res
        .status(400)
        .json({ message: "chatId, questionId, and answer are required" });
    }

    // Find the user by chatId or create a new one if not found
    let user = await urModel.findOne({ chatId });

    if (!user) {
      user = new urModel({ chatId, answers: [] }); // Initialize answers as an empty array
    }

    // Convert questionId and answer to numbers
    const questionIdNum = parseInt(questionId);
    const answerNum = parseInt(answer);

    // Check if the questionId already exists in answers array
    const existingAnswerIndex = user.answers.findIndex((ans) => {
      console.log("Answer:", ans);
      console.log("Comparison:", ans.questionId, questionIdNum);
      return ans.questionId === questionIdNum;
    });
    console.log("Existing Answer Index:", existingAnswerIndex);

    if (existingAnswerIndex !== -1) {
      // If the questionId already exists, update the answer
      user.answers[existingAnswerIndex].answer = answerNum;
    } else {
      // If the questionId doesn't exist, add a new answer
      user.answers.push({ questionId: questionIdNum, answer: answerNum });
    }

    await user.save();

    res.json({ message: "Answer added successfully" });
  } catch (error) {
    console.error("Error adding answer:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
