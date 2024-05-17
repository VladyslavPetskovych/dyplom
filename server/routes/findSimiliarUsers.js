const express = require("express");
const router = express.Router();
const axios = require("axios");

async function fetchData(chatId) {
    const userUrl = `https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/users/getUser/${chatId}`;
    const allUsersUrl = "https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/users/all";
    try {
        const userResponse = await axios.get(userUrl);
        const allUsersResponse = await axios.get(allUsersUrl);
        return { userResponse: userResponse.data, allUsersResponse: allUsersResponse.data };
    } catch (error) {
        console.error("API Request Failed:", error);
        throw error;
    }
}

function calculateCustomSimilarity(answer1, answer2) {
    const difference = Math.abs(answer1 - answer2);
    const alpha = 5; 
    return Math.exp(-alpha * difference);
}


function extractAndAlignAnswers(targetAnswers, userAnswers) {
    const targetMap = new Map(targetAnswers.map(a => [a.questionId, a.answer]));
    const userMap = new Map(userAnswers.map(a => [a.questionId, a.answer]));

    const commonQuestions = [...targetMap.keys()].filter(id => userMap.has(id));
    const targetVector = commonQuestions.map(id => targetMap.get(id));
    const userVector = commonQuestions.map(id => userMap.get(id));

    return { targetVector, userVector };
}

router.get("/:chatId", async (req, res) => {
    const chatId = req.params.chatId;

    try {
        const { userResponse, allUsersResponse } = await fetchData(chatId);
        const targetAnswers = userResponse.user.answers;
        const usersSimilarity = allUsersResponse.userss.map(user => {
            const { targetVector, userVector } = extractAndAlignAnswers(targetAnswers, user.answers);
            const similarityScores = targetVector.map((value, index) => 
                calculateCustomSimilarity(value, userVector[index]));
            const averageSimilarity = similarityScores.length > 0 ? 
                similarityScores.reduce((acc, cur) => acc + cur, 0) / similarityScores.length : 0;
            return {
                userId: user.name,
                similarity: averageSimilarity
            };
        });

        res.status(200).json({ targetUser: userResponse.user, similarities: usersSimilarity });
    } catch (error) {
        res.status(500).send("Error processing your request");
    }
});

module.exports = router;
