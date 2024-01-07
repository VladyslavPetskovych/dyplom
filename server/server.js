const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  console.log("here");
  res.render("adminpanel",{text:'world'});
});

const useRouter = require('./routes/user');

app.use('/users',useRouter)

app.listen(3000);
