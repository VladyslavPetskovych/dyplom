const express = require("express");
const router = express.Router();
const Category = require("../models/categories");
const User = require("../models/users");

router.use(express.json());

router.post("/", async (req, res) => {
  try {
    const { category_name } = req.body;

    const highestCategory = await Category.findOne().sort({ category_id: -1 });

    const nextCategoryId = highestCategory
      ? highestCategory.category_id + 1
      : 1;

    const newCategory = new Category({
      category_id: nextCategoryId,
      category_name,
    });
    await newCategory.save();

    res.status(201).json({ message: "Category added successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error adding category to the database" });
  }
});
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();

    if (!categories) {
      return res.status(404).json({ error: "No categories found" });
    }

    res.status(200).json(categories);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Error getting categories from the database" });
  }
});

router.post("/:chatid/interests", async (req, res) => {
  try {
    const { chatid } = req.params;
    const { interests } = req.body;

    if (!Array.isArray(interests) || interests.length > 5) {
      return res
        .status(400)
        .json({
          error: "Interests must be an array with no more than 5 items.",
        });
    }

    let user = await User.findOne({ chatId: chatid });

    if (!user) {
      user = new User({ chatId: chatid, interests });
    } else {
      user.interests = interests;
    }

    await user.save();
    res.status(200).json({ message: "Interests saved successfully", user });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error saving interests" });
  }
});

// Get user interests
router.get("/:chatid/interests", async (req, res) => {
  try {
    const { chatid } = req.params;
    const user = await User.findOne({ chatId: chatid });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ interests: user.interests });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error fetching user interests" });
  }
});

module.exports = router;
