const express = require("express");
const router = express.Router();
const axios = require("axios");

async function fetchData(chatId) {
  const userUrl = `https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/users/getUser/${chatId}`;
  const allUsersUrl =
    "https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/users/all";
  try {
    const userResponse = await axios.get(userUrl);
    const allUsersResponse = await axios.get(allUsersUrl);
    return {
      userResponse: userResponse.data,
      allUsersResponse: allUsersResponse.data,
    };
  } catch (error) {
    console.error("API Request Failed:", error);
    throw new Error("Failed to fetch data from the API");
  }
}

function transformAnswer(answer) {
  return Math.exp(answer);
}

function cosineSimilarity(vecA, vecB) {
  if (vecA.length !== vecB.length)
    throw new Error("Vectors must be of the same length");

  const dotProduct = vecA.reduce((acc, cur, idx) => acc + cur * vecB[idx], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((acc, cur) => acc + cur * cur, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((acc, cur) => acc + cur * cur, 0));

  return magnitudeA === 0 || magnitudeB === 0
    ? 0
    : dotProduct / (magnitudeA * magnitudeB);
}

router.get("/:chatId", async (req, res) => {
  const chatId = req.params.chatId;

  try {
    const { userResponse, allUsersResponse } = await fetchData(chatId);
    const targetAnswers = userResponse.user.answers;

    if (targetAnswers.length === 0) {
      const usersSimilarity = allUsersResponse.userss.map((user) => ({
        userId: user._id,
        similarity: 0,
      }));
      return res
        .status(200)
        .json({ targetUser: userResponse.user, similarities: usersSimilarity });
    }

    const usersSimilarity = allUsersResponse.userss.map((user) => {
      if (!user.answers || user.answers.length === 0) {
        return { userId: user._id, similarity: 0 };
      }

      const commonQuestions = targetAnswers.filter((ta) =>
        user.answers.find((ua) => ua.questionId === ta.questionId)
      );

      if (commonQuestions.length === 0) {
        return { userId: user._id, similarity: 0 };
      }

      const targetVector = commonQuestions.map((ta) => {
        const found = user.answers.find(
          (ua) => ua.questionId === ta.questionId
        );
        return found ? transformAnswer(ta.answer) : 0;
      });

      const userVector = commonQuestions.map((ta) => {
        const found = user.answers.find(
          (ua) => ua.questionId === ta.questionId
        );
        return found ? transformAnswer(found.answer) : 0;
      });

      const similarity = cosineSimilarity(targetVector, userVector);
      return {
        userId: user.name,
        similarity,
      };
    });

    res
      .status(200)
      .json({ targetUser: userResponse.user, similarities: usersSimilarity });
  } catch (error) {
    console.error("Error processing request:", error.message);
    res.status(500).send("Error processing your request");
  }
});

module.exports = router;
