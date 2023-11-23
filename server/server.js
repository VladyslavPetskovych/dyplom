const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  console.log("here");
  res.render("adminpanel");
});

app.listen(3000);
