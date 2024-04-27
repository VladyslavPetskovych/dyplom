const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    chatId: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
    },
    answers: [
      {
        _id: false,
        questionId: {
          type: Number,
          required: true,
        },
        answer: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const urModel = mongoose.model("users", userSchema);
module.exports = urModel;
