const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const Chat = require("../models/chats");
const axios = require("axios");

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

async function createChat(participantIds) {
  const url =
    "https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/chats/newChat"; 
  const data = {
    participantIds: participantIds,
  };

  try {
    const response = await axios.post(url, data);
    console.log("Chat created successfully:", response.data);
  } catch (error) {
    console.error(
      "Failed to create chat:",
      error.response ? error.response.data : error.message
    );
  }
}

router.post("/messages", async (req, res) => {
  const { message } = req.body;
  
  const senderId = parseInt(req.body.senderId);
  const receiverId = parseInt(req.body.receiverId);

  console.log("Received message data:", senderId, receiverId, message);
  console.log(
    "Data types:",
    typeof senderId,
    typeof receiverId,
    typeof message
  );

  try {
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
      timestamp: new Date(), 
    });
    await newMessage.save();

    try {
      console.log("fdfdfd");
      await createChat([senderId, receiverId]);
      res.status(201).json(newMessage); 
    } catch (chatError) {
      console.error("Failed to create chat:", chatError);
      res
        .status(500)
        .json({ error: "Failed to create chat", details: chatError });
    }
  } catch (error) {
    console.error("Failed to save message:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/groupMessages/:chatId/:userId", async (req, res) => {
  const { chatId, userId } = req.params;

  try {
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    if (!chat.participants.includes(userId)) {
      return res
        .status(403)
        .json({ error: "You are not a participant of this chat" });
    }

    const messages = await Message.find({ chatId }).sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error("Failed to load messages:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/groupMessages", async (req, res) => {
  const { chatId, senderId, message } = req.body;

  const newMessage = new Message({
    chatId,
    senderId,
    message,
  });

  try {
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Failed to send message:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
