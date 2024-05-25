const express = require("express");
const router = express.Router();
const urModel = require("../models/users");
const Question = require("../models/questions");

router.use(express.json());

router.get("/getUserAnswers/:chatId", async (req, res) => {
    try {
        const { chatId } = req.params;

        // Find the user's answers for the given chatId
        const userAnswers = await urModel.findOne({ chatId });

        if (!userAnswers) {
            return res.status(404).json({ message: "User answers not found" });
        }

        // Fetch question details for each answer
        const answersWithQuestions = [];
        for (const answer of userAnswers.answers) {
            const question = await Question.findOne({ questionNumber: answer.questionId });
            if (question) {
                answersWithQuestions.push({
                    questionText: question.questionText,
                    questionId: question.questionNumber,
                    userAnswer: answer.answer
                });
            }
        }

        res.json(answersWithQuestions);
    } catch (error) {
        console.error("Error fetching user answers:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.delete("/deleteUserAnswer/:chatId/:questionId", async (req, res) => {
    try {
        const { chatId, questionId } = req.params;

        // Find the user by chatId
        const user = await urModel.findOne({ chatId });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Filter out the answer to be deleted
        const updatedAnswers = user.answers.filter(
            (answer) => answer.questionId.toString() !== questionId
        );

        // Update the user's answers
        user.answers = updatedAnswers;
        await user.save();

        res.json({ message: "Answer deleted successfully" });
    } catch (error) {
        console.error("Error deleting user answer:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;