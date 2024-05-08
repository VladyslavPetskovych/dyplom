const express = require("express");
const http = require("http"); // Include the HTTP module
const socketIo = require("socket.io"); // Include Socket.IO
const app = express();
const server = http.createServer(app); // Create an HTTP server with Express
const io = socketIo(server, {
  cors: {
    origin: "*", // Allow all origins for development, restrict in production
    methods: ["GET", "POST"],
  },
});

const dbConfig = require("./db"); // Configure your database (ensure this sets up the connection)
const cors = require("cors");
const path = require("path");

app.set("view engine", "ejs");

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});
app.use("/usersPics", express.static(path.join(__dirname, "usersPics")));

app.get("/server3", (req, res) => {
  res.json({ text: "root for server3 at port 3002" });
});

const useRouter = require("./routes/user");
const qRouter = require("./routes/question");
const categoryRouter = require("./routes/category");
const profileRouter = require("./routes/profile");
const userAnswersRouter = require("./routes/userAnswers");
const userQuestionsRouter = require("./routes/userQuestions");
const userPostsRouter = require("./routes/posts");
const messagesRouter = require("./routes/messages");

app.use("/server3/users", useRouter);
app.use("/server3/questions", qRouter);
app.use("/server3/category", categoryRouter);
app.use("/server3/profile", profileRouter);
app.use("/server3/userAnswers", userAnswersRouter);
app.use("/server3/userQuestions", userQuestionsRouter);
app.use("/server3/userPosts", userPostsRouter);
app.use("/server3/messages", messagesRouter);

io.on("connection", (socket) => {
  console.log(`New client connected: ${socket.id}`);

  // Inside socket.on('sendMessage', ...)
  socket.on("sendMessage", async (data) => {
    const senderId = parseInt(data.senderId);
    const receiverId = parseInt(data.receiverId);

    if (senderId && receiverId && data.message) {
      try {
        const newMessage = new Message({
          senderId: senderId,
          receiverId: receiverId,
          message: data.message,
          timestamp: new Date(),
        });
        await newMessage.save();
        io.emit("message", newMessage);
      } catch (error) {
        console.error("Failed to save message:", error);
      }
    } else {
      console.log("Message data is incomplete or invalid:", data);
    }
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Use the HTTP server to listen, not the Express app directly
server.listen(3002, () => {
  console.log("Express server with Socket.IO is running on port 3002");
});
