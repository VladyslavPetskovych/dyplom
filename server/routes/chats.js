const express = require("express");
const router = express.Router();
const Chat = require("../models/chats");

router.post("/newChat", async (req, res) => {
    const { participantIds } = req.body;

    if (!participantIds || participantIds.length < 2) {
        return res.status(400).json({ message: "At least two participant IDs are required to create a chat." });
    }

    try {
    
        const sortedParticipantIds = participantIds.sort((a, b) => a - b);

        const existingChat = await Chat.findOne({ participants: { $all: sortedParticipantIds, $size: sortedParticipantIds.length } });

        if (existingChat) {
            return res.status(409).json({ message: "A chat with the same participants already exists.", chatId: existingChat._id });
        }

        const newChat = new Chat({
            participants: sortedParticipantIds
        });

        await newChat.save();
        res.status(201).json({ message: "Chat created successfully", chatId: newChat._id });
    } catch (error) {
        console.error("Failed to create chat:", error);
        res.status(500).json({ error: error.message });
    }
});

router.get("/userChats/:userId", async (req, res) => {
    const userId = parseInt(req.params.userId);

    try {
        // Find all chats where the userId is in the participants array
        const chats = await Chat.find({ participants: userId });
        res.status(200).json(chats);
    } catch (error) {
        console.error("Failed to retrieve chats:", error);
        res.status(500).json({ error: "Failed to retrieve chats due to an internal error." });
    }
});

module.exports = router;
