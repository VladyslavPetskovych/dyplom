const express = require("express");
const router = express.Router();
const urModel = require("../models/users");
const Question = require("../models/questions");

router.use(express.json());

router.get("/getAnsweredQuestion/:chatId", async (req, res) => {

});

module.exports = router;