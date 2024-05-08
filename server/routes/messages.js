const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// Message retrieval route
router.get("/messages/:senderId/:receiverId", async (req, res) => {
  const { senderId, receiverId } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    console.error("Failed to retrieve messages:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/messages", async (req, res) => {
    const { message } = req.body;
    // Parse senderId and receiverId from request body
    const senderId = parseInt(req.body.senderId);
    const receiverId = parseInt(req.body.receiverId);

    console.log("Received message data:", senderId, receiverId, message);
    console.log("Data types:", typeof senderId, typeof receiverId, typeof message);

    try {
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
            timestamp: new Date(), // Assuming your schema has a timestamp
        });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Failed to save message:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
