const express = require("express");
const app = express();
const dbConfig = require("./db");
const cors = require("cors");
app.set("view engine", "ejs");

app.use(cors());
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/dyp", (req, res) => {
  res.json({ text: "root for server3 at port 3002" });
});

const useRouter = require("./routes/user");
const qRouter = require("./routes/question");
const categoryRouter = require("./routes/category");
const profileRouter = require("./routes/profile");

app.use("/dyp/users", useRouter);
app.use("/dyp/questions", qRouter);
app.use("/dyp/category", categoryRouter);
app.use("/dyp/profile", profileRouter);

app.listen(3002, '0.0.0.0', () => {
  console.log('Express server is running on port 3002');
});

