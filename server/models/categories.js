const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    category_id: {
      type: Number,
      required: true,
      unique: true,
    },
    category_name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Categories", categorySchema);
module.exports = Category;
