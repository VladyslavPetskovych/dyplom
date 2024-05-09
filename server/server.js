const express = require("express");
const http = require("http"); // Include the HTTP module
const socketIo = require("socket.io"); // Include Socket.IO
const app = express();
const server = http.createServer(app);
const Message = require("./models/Message");

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

io.of("/server3").on("connection", (socket) => {
  console.log(`New client connected: ${socket.id}`);

  socket.on("join", ({ userId }) => {
    socket.join(`user-${userId}`);
    socket.join(`user-${userId}`);
    console.log(`User ${userId} joined room: user-${userId}`);
  });

  socket.on("sendMessage", async (data) => {
    const { senderId, receiverId, message } = data;

    if (validateMessageData(senderId, receiverId, message)) {
      try {
        const newMessage = new Message({
          senderId,
          receiverId,
          message,
          timestamp: new Date(),
        });
        await newMessage.save();

        socket.to(`user-${receiverId}`).emit("message", newMessage); // Assuming 'receiverId' is in a room labeled by their ID
        socket.emit(
          "messageConfirmation",
          `Message received and broadcasted: ${newMessage.message}`
        );
        socket
          .to(`user-${senderId}`)
          .to(`user-${receiverId}`)
          .emit("message", newMessage);

        socket.emit(
          "messageConfirmation",
          `Message received and broadcasted: ${newMessage.message}`
        );
        console.log("Message sent:", newMessage);
      } catch (error) {
        console.error("Failed to save message:", error);
        socket.emit("error", "Message failed to send.");
      }
    } else {
      console.log("Invalid message data received:", data);
      socket.emit("error", "Invalid message data");
    }
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

server.listen(3002, () => {
  console.log("Express server with Socket.IO is running on port 3002");
});

function validateMessageData(senderId, receiverId, message) {
  return (
    typeof senderId === "number" &&
    typeof receiverId === "number" &&
    typeof message === "string"
  );
}
