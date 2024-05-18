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
router.put('/editPost/:chatId/:postId', async (req, res) => {
    const { chatId, postId } = req.params;
    const { text } = req.body;

    console.log("Received chatId:", chatId);
    console.log("Received postId:", postId);
    console.log("Received text:", text);

    if (!text) {
        return res.status(400).send("Post text is required.");
    }

    try {
        const user = await urModel.findOneAndUpdate(
            { chatId: parseInt(chatId, 10), "posts._id": postId },
            { $set: { "posts.$.text": text, "posts.$.updatedAt": new Date() } },
            { new: true, upsert: false }
        );

        if (!user) {
            console.log("No user found with chatId:", chatId);
            return res.status(404).send("User not found.");
        }

        console.log("Updated User:", user);
        res.status(200).json(user.posts.find(post => post._id.toString() === postId));
    } catch (error) {
        console.error("Error in editPost:", error);
        res.status(500).send("Error editing post.");
    }
});

router.delete('/deletePost/:chatId/:postId', async (req, res) => {
    const { chatId, postId } = req.params;

    console.log("Received chatId:", chatId);
    console.log("Received postId:", postId);

    try {
        const user = await urModel.findOneAndUpdate(
            { chatId: parseInt(chatId, 10) },
            { $pull: { posts: { _id: postId } } },
            { new: true, upsert: false }
        );

        if (!user) {
            console.log("No user found with chatId:", chatId);
            return res.status(404).send("User not found.");
        }

        console.log("Updated User:", user);
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error("Error in deletePost:", error);
        res.status(500).send("Error deleting post.");
    }
});

module.exports = router;
