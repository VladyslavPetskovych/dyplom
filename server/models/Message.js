const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    senderId: { type: Number, required: true },
    receiverId: { type: Number, required: false }, // Not required for group messages
    chatId: { type: String, required: false }, // Required for group messages
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  });
  

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
