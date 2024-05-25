import React, { useState, useEffect } from "react";
import axios from "axios";
import { socket } from "./socket"; // Ensure you have a socket instance created
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import GroupMessageList from "./GroupMessageList"; // Component to list group messages
import MessageInput from "./messageInput"; // Component for message input

function GroupChat() {
  const { chatId } = useParams();
  const senderId = useSelector((state) => state.user.chatId);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/messages/groupMessages/${chatId}/${senderId}`
        );
        setMessages(response.data);
        console.log("Fetched messages:", response.data);
      } catch (error) {
        console.error("Failed to load messages:", error);
      }
    };

    fetchMessages();

    socket.emit("joinGroup", { chatId, userId: senderId });

    socket.on("groupMessage", (message) => {
      console.log("Group message received:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("groupMessage");
    };
  }, [chatId, senderId]);

  const sendMessage = (input) => {
    if (input.trim()) {
      const messageData = {
        senderId,
        chatId,
        message: input,
        timestamp: new Date(),
      };

      socket.emit("sendGroupMessage", messageData);
    }
  };

  return (
    <div className="bg-slate-600 text-white flex flex-col h-[85vh] relative">
      <GroupMessageList messages={messages} senderId={senderId} />
      <MessageInput sendMessage={sendMessage} />
    </div>
  );
}

export default GroupChat;
