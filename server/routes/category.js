const express = require("express");
const router = express.Router();
const Category = require("../models/categories");

router.use(express.json());

router.post("/", async (req, res) => {
  try {
    const { category_name } = req.body;

    // Find the highest category_id in the database
    const highestCategory = await Category.findOne().sort({ category_id: -1 });

    // Determine the next category_id
    const nextCategoryId = highestCategory ? highestCategory.category_id + 1 : 1;

    // Create a new category
    const newCategory = new Category({ category_id: nextCategoryId, category_name });
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
      res.status(500).json({ error: "Error getting categories from the database" });
    }
  });
module.exports = router;
