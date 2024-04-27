const express = require("express");
const router = express.Router();
const urModel = require("../models/users");
const fs = require("fs");
const path = require("path");

router.use(express.json());

router.put("/edit/:chatId", async (req, res) => {
  const chatId = parseInt(req.params.chatId);
  const { name } = req.body;

  // Validate name
  if (!name || typeof name !== "string") {
    return res
      .status(400)
      .json({ error: "Name is required and must be a string" });
  }

  console.log(chatId);
  console.log(typeof chatId);
  try {
    // Update user by chatId
    const user = await urModel.findOneAndUpdate(
      { chatId }, // Find user by chatId
      { name }, // Update the name
      { new: true } // Return the modified user
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    console.error("Error updating user name:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const profilePicsDir = path.join(__dirname, "profilePics");

// Create the profilePics directory if it doesn't exist
if (!fs.existsSync(profilePicsDir)) {
  fs.mkdirSync(profilePicsDir);
}

router.put("/editPhoto/:chatId", async (req, res) => {
  const chatId = req.params.chatId;

  // Get the image data from the request body
  const imageData = req.body.imageData;

  // Generate a unique filename for the image using the chatId
  const imageFileName = `img${chatId}.${Date.now()}.jpg`;

  // Define the path where the image will be stored
  const imagePath = path.join(profilePicsDir, imageFileName);

  try {
    // Write the image data to the file
    fs.writeFileSync(imagePath, imageData, "base64");

    // Respond with a success message
    res.status(200).json({ message: "Profile image uploaded successfully" });
  } catch (error) {
    // If an error occurs, respond with an error message
    console.error("Error uploading profile image:", error);
    res.status(500).json({ error: "Failed to upload profile image" });
  }
});

module.exports = router;
