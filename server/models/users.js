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
    age: {
      type: Number,
    },
    sex: {
      type: String,
    },
    city: {
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
    img: {
      type: String,
      default: "defUser.jpg",
    },
    posts: [
      {
        text: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    interests: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const urModel = mongoose.model("users", userSchema);
module.exports = urModel;
