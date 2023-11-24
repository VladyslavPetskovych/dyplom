const express = require("express");
const router = express.Router();

router.get("/", (res, req) => {
  res.send("User List");
});

router.get("/new",(res,req)=>{
    res.send('new user')
})