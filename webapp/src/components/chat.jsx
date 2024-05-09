import React, { useState, useEffect } from "react";
import { socket } from "../components/socket";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function Chat() {
  const { receiverId: receiverIdString } = useParams();
  const receiverId = parseInt(receiverIdString);
  const senderId = parseInt(useSelector((state) => state.user.chatId));

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!senderId || !receiverId) {
      console.log("IDs not available yet.");
      return;
    }
  
    socket.on("message", (message) => {
      console.log("Message received via WebSocket:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  
    socket.on("messageConfirmation", (confirmation) => {
      console.log("Confirmation from server:", confirmation);
    });
  
    axios.get(`https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/messages/messages/${senderId}/${receiverId}`)
      .then((response) => {
        setMessages(response.data);
        console.log("Initial messages loaded:", response.data);
      })
      .catch((err) => {
        console.error("Failed to load messages:", err);
      });
  
    return () => {
      socket.off("message");
      socket.off("messageConfirmation");
    };
  }, [senderId, receiverId]);  
  

  const sendMessage = () => {
    if (input.trim()) {
      const messageData = {
        senderId,
        receiverId,
        message: input,
        timestamp: new Date(), // Optionally add a timestamp client-side
      };
      
      // Emit the message to the server
      socket.emit("sendMessage", messageData);
      
      // Optimistically update the UI by adding the new message to the messages list
      setMessages(prevMessages => [...prevMessages, messageData]);
  
      // Clear the input field
      setInput("");  
    }
  };
  

  return (
    <div>
      {messages.map((msg, index) => (
        <p key={index}>
          <strong>{msg.senderId || "User"}:</strong> {msg.message}
        </p>
      ))}
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;
