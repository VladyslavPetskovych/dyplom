const mongoose = require("mongoose");

const questionSchema = mongoose.Schema(
  {
    questionNumber: {
      type: Number,
      required: true,
    },
    questionText: {
      type: String,
      required: true,
      unique: true, // Забезпечує, що питання не повторюються
    },
    category_id: {
      type: String,
    },
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
