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
  const { name, age, sex, city } = req.body;

  if (!name || typeof name !== "string") {
    return res
      .status(400)
      .json({ error: "Name is required and must be a string" });
  }

  if (age && typeof age !== "number") {
    return res.status(400).json({ error: "Age must be a number" });
  }

  if (sex && typeof sex !== "string") {
    return res.status(400).json({ error: "Sex must be a string" });
  }

  if (city && typeof city !== "string") {
    return res.status(400).json({ error: "City must be a string" });
  }

  try {
    const updatedFields = { name, age, sex, city };
    Object.keys(updatedFields).forEach(
      (key) => updatedFields[key] === undefined && delete updatedFields[key]
    );

    const user = await urModel.findOneAndUpdate(
      { chatId }, 
      updatedFields, 
      { new: true } 
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

router.put(
  "/editPhoto/:chatId",
  upload.single("profilePic"),
  async (req, res) => {
    const chatId = req.params.chatId;
    if (!req.file) {
      return res.status(400).send({ error: "No file uploaded" });
    }

    try {

      const image = await Jimp.read(req.file.buffer);

      await image.resize(500, Jimp.AUTO);
     
      const buffer = await image.quality(90).getBufferAsync(Jimp.MIME_JPEG);

      const filename = `${chatId}.jpeg`; 
      const filePath = path.join(__dirname, "..", "usersPics", filename);

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
