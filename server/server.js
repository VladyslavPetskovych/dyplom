const express = require("express");
const app = express();
const dbConfig = require("./db");
const cors = require("cors");
const path = require('path');
app.set("view engine", "ejs");

app.use(cors());
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});
app.use('/server3/usersPics', express.static(path.join(__dirname, 'public', 'usersPics')));

app.get("/server3", (req, res) => {
  res.json({ text: "root for server3 at port 3002" });
});

const useRouter = require("./routes/user");
const qRouter = require("./routes/question");
const categoryRouter = require("./routes/category");
const profileRouter = require("./routes/profile");
const userAnswersRouter = require("./routes/userAnswers");
const userQuestionsRouter = require("./routes/userQuestions");

app.use("/server3/users", useRouter);
app.use("/server3/questions", qRouter);
app.use("/server3/category", categoryRouter);
app.use("/server3/profile", profileRouter);
app.use("/server3/userAnswers", userAnswersRouter);
app.use("/server3/userQuestions", userQuestionsRouter);

app.listen(3002, () => {
  console.log('Express server is running on port 3002');
});

