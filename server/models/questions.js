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
      unique: true, 
    },
    category_id: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
