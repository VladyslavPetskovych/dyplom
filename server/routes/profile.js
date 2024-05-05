const express = require("express");
const router = express.Router();
const urModel = require("../models/users");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const Jimp = require("jimp");

router.use(express.json());

router.put("/edit/:chatId", async (req, res) => {
  const chatId = parseInt(req.params.chatId);
  const { name } = req.body;

  if (!name || typeof name !== "string") {
    return res
      .status(400)
      .json({ error: "Name is required and must be a string" });
  }

  console.log(chatId);
  console.log(typeof chatId);
  try {
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

const storage = multer.memoryStorage(); // Use memory storage to handle file transformation
const upload = multer({ storage: storage });

// Update user profile picture
router.put(
  "/editPhoto/:chatId",
  upload.single("profilePic"),
  async (req, res) => {
    const chatId = req.params.chatId;
    if (!req.file) {
      return res.status(400).send({ error: "No file uploaded" });
    }

    try {
      // Load the image with Jimp
      const image = await Jimp.read(req.file.buffer);
      // Resize the image to width of 500 pixels and auto scale the height
      await image.resize(500, Jimp.AUTO);
      // Convert the image to JPEG format
      const buffer = await image.quality(90).getBufferAsync(Jimp.MIME_JPEG);

      const filename = `${chatId}.jpeg`; // Save the file as JPEG with chatId as the filename
      const filePath = path.join(__dirname, "..", "usersPics", filename);

      // Write the processed image to disk
      await fs.promises.writeFile(filePath, buffer);
      const updatedUser = await urModel.findOneAndUpdate(
        { chatId: parseInt(chatId) },
        { img: filename },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ user: updatedUser });
    } catch (error) {
      console.error("Error updating user profile picture:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = router;
