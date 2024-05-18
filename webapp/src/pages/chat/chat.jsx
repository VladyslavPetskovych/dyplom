import React, { useState, useEffect } from "react";
import axios from "axios";
import { socket } from "./socket";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import MessageList from "./messageList";
import MessageInput from "./messageInput";

function Chat() {
  const { receiverId: receiverIdString } = useParams();
  const receiverId = parseInt(receiverIdString);
  const senderId = parseInt(useSelector((state) => state.user.chatId));
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/messages/messages/${senderId}/${receiverId}`
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Failed to load messages:", error);
      }
    };

    fetchMessages();

    socket.emit("joinRoom", { userId: senderId });

    socket.on("message", (message) => {
      console.log("Message received:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, [senderId, receiverId]);

  const sendMessage = (input) => {
    if (input.trim()) {
      const messageData = {
        senderId,
        receiverId,
        message: input,
        timestamp: new Date(),
      };

      socket.emit("sendMessage", messageData);
    }
  };

  return (
    <div className="bg-slate-600 text-white flex flex-col h-[85vh] relative">
      <MessageList messages={messages} senderId={senderId} receiverId={receiverId} />
      <MessageInput sendMessage={sendMessage} />
    </div>
  );
}

export default Chat;
