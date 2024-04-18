const express = require("express");
const app = express();
const dbConfig = require("./db");
const cors = require("cors");
app.set("view engine", "ejs");

app.use(cors());
app.get("/", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.json({ text: " root!!!!!!!!!!!!!!!!!!!" });
});

const useRouter = require("./routes/user");
const qRouter = require("./routes/question");
const catRouter = require("./routes/category");

app.use("/users", useRouter);
app.use("/questions", qRouter);
app.use("/category", catRouter);

app.listen(3000);
