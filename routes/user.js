const express = require("express");
const router = express.Router();

router.get("/user", (res, req) => {
  res.send("User List");
});
