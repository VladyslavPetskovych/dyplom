const express = require("express");
const router = express.Router();
const Question = require("../models/questions");

router.use(express.json());

router.post("/", async (req, res) => {
  try {
    const { questionText, category_ids } = req.body;

    const questionCount = await Question.countDocuments();

    const newQuestion = new Question({
      questionNumber: questionCount + 1,
      questionText,
      category_id: category_ids,
    });

    await newQuestion.save();

    res.status(201).send("Питання додано успішно");
  } catch (err) {
    console.error(err);
    res.status(500).send("Помилка додавання питання до бази даних");
  }
});
router.get("/", async (req, res) => {
  try {
    const questions = await Question.find();

    if (!questions || questions.length === 0) {
      return res.status(404).json({ error: "No questions found" });
    }

    res.status(200).json(questions);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Error getting questions from the database" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const questionId = req.params.id;

    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.status(200).json(question);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error getting question from the database" });
  }
});

module.exports = router;
