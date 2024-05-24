import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import GroupMessageList from "./GroupMessageList";
import MessageInput from "./messageInput";

function GroupChat() {
  const { chatId } = useParams();
  const senderId = useSelector((state) => state.user.chatId);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/server3/messages/groupMessages/${chatId}/${senderId}`
        );

        setMessages(response.data);
        console.log("Fetched messages:", response.data);
      } catch (error) {
        console.error("Failed to load messages:", error);
      }
    };

    fetchMessages();

    return () => {
      // Clean up if needed
    };
  }, [chatId, senderId]);

  const sendMessage = async (input) => {
    if (input.trim()) {
      const messageData = {
        chatId,
        senderId,
        message: input,
      };

      try {
        const response = await axios.post(
          "http://localhost:3002/server3/messages/groupMessages",
          messageData
        );
        setMessages((prevMessages) => [...prevMessages, response.data]);
        console.log("Sent message:", response.data);
      } catch (error) {
        console.error("Failed to send message:", error);
      }
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
