const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    chatId: {
      type: String,
      required: true,
    },
    name: { type: String },
    answers: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

const urModel = mongoose.model("users", userSchema);
module.exports = urModel;
