const express = require('express');
const router = express.Router();

const urModel = require("../models/users");

router.post('/newPost/:chatId', async (req, res) => {
    const { chatId } = req.params; // Make sure this matches the route parameter name
    const { text } = req.body;

    console.log("Received chatId:", chatId); // Debugging output
    console.log("Received text:", text); // Debugging output

    if (!text) {
        return res.status(400).send("Post text is required.");
    }

    try {
        const user = await urModel.findOneAndUpdate(
            { chatId: parseInt(chatId, 10) }, // Assuming chatId should be an integer
            { $set: { posts: [{ text, createdAt: new Date() }] } },
            { new: true, upsert: false }
        );

        if (!user) {
            console.log("No user found with chatId:", chatId); // Debugging output
            return res.status(404).send("User not found.");
        }

        console.log("Updated User:", user); // Debugging output
        res.status(201).json(user.posts[0]);
    } catch (error) {
        console.error("Error in addPost:", error); // More explicit error logging
        res.status(500).send("Error adding post to user.");
    }
});

module.exports = router;
