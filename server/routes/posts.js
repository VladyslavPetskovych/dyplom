const express = require('express');
const router = express.Router();
const urModel = require("../models/users");

router.post('/newPost/:chatId', async (req, res) => {
    const { chatId } = req.params; 
    const { text } = req.body;

    console.log("Received chatId:", chatId); 
    console.log("Received text:", text); 

    if (!text) {
        return res.status(400).send("Post text is required.");
    }

    try {
        const user = await urModel.findOneAndUpdate(
            { chatId: parseInt(chatId, 10) }, 
            { $push: { posts: { text, createdAt: new Date() } } },
            { new: true, upsert: false }
        );

        if (!user) {
            console.log("No user found with chatId:", chatId); 
            return res.status(404).send("User not found.");
        }

        console.log("Updated User:", user); 
        res.status(201).json(user.posts[user.posts.length - 1]);
    } catch (error) {
        console.error("Error in addPost:", error); 
        res.status(500).send("Error adding post to user.");
    }
});

module.exports = router;
