import React, { useState, useEffect, useRef } from "react";
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
  const hasJoinedGroupRef = useRef(false);

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

    if (!hasJoinedGroupRef.current) {
      console.log(`Joining group ${chatId} for user ${senderId}`);
      socket.emit("joinGroup", { chatId, userId: senderId });
      hasJoinedGroupRef.current = true;
    }

    const handleGroupMessage = (message) => {
      console.log("Group message received:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on("groupMessage", handleGroupMessage);

    return () => {
      console.log(`Leaving group ${chatId} for user ${senderId}`);
      socket.off("groupMessage", handleGroupMessage);
      socket.emit("leaveGroup", { chatId, userId: senderId });
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

      console.log("Sending group message:", messageData);
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
