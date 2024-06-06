const express = require("express");
const http = require("http");
const socketIo = require("socket.io"); 
const app = express();
const server = http.createServer(app);
const Message = require("./models/Message");
const axios = require("axios");

const io = socketIo(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"],
  },
});

const dbConfig = require("./db"); 
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
const chatsRouter = require("./routes/chats");
const findSimiliarUsersRouter = require("./routes/findSimiliarUsers");

app.use("/server3/users", useRouter);
app.use("/server3/questions", qRouter);
app.use("/server3/category", categoryRouter);
app.use("/server3/profile", profileRouter);
app.use("/server3/userAnswers", userAnswersRouter);
app.use("/server3/userQuestions", userQuestionsRouter);
app.use("/server3/userPosts", userPostsRouter);
app.use("/server3/messages", messagesRouter);
app.use("/server3/chats", chatsRouter);
app.use("/server3/findSimiliarUsers", findSimiliarUsersRouter);

io.of("/socket").on("connection", (socket) => {
  console.log(`Connected client ${socket.id}`);
  socket.on("joinRoom", ({ userId }) => {
    socket.join(`user-${userId}`);
    console.log(`User ${userId} joined room: user-${userId}`);
  });

  socket.on("sendMessage", async (data) => {
    try {

      const response = await axios.post(
        "https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/messages/messages",
        data
      );
      const newMessage = response.data;

      socket.to(`user-${data.receiverId}`).emit("message", newMessage);
      socket.emit("message", newMessage);
      console.log("Message sent to receiver and confirmed to sender.");
    } catch (error) {
      console.error("Failed to save message via internal API:", error);
      socket.emit("error", "Message failed to send.");
    }
  });

  socket.on("joinGroup", ({ chatId }) => {
    socket.join(`group-${chatId}`);
    console.log(`User joined group chat: group-${chatId}`);
  });

  socket.on("sendGroupMessage", async (data) => {
    try {
      const response = await axios.post(
        "https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/messages/groupMessages",
        data
      );
      const newGroupMessage = response.data;

      io.of("/socket")
        .to(`group-${data.chatId}`)
        .emit("groupMessage", newGroupMessage);
      console.log("Group message sent to all users in the group.");
    } catch (error) {
      console.error("Failed to save group message via internal API:", error);
      socket.emit("error", "Group message failed to send.");
    }
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

server.listen(3002, () => {
  console.log("Express server with Socket.IO is running on port 3002");
});
