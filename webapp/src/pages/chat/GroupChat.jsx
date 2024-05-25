import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { socket } from "./socket";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import GroupMessageList from "./GroupMessageList";
import MessageInput from "./messageInput";

function GroupChat() {
  const { chatId } = useParams();
  const senderId = useSelector((state) => state.user.chatId);
  const [messages, setMessages] = useState([]);
  const hasConnected = useRef(false); // useRef to keep track of connection status

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/messages/groupMessages/${chatId}/${senderId}`
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Failed to load messages:", error);
      }
    };

    fetchMessages();

    // Ensure joinGroup is emitted only once
    if (!hasConnected.current) {
      socket.emit("joinGroup", { chatId });
      hasConnected.current = true;
    }

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
        chatId,
        senderId,
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
