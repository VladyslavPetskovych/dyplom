import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const socket = io("https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3");

function Chat() {
    const { receiverId: receiverIdString } = useParams(); 
    const receiverId = parseInt(receiverIdString); // Convert to integer
    const senderId = parseInt(useSelector((state) => state.user.chatId));
  
    console.log(typeof receiverId, typeof senderId);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
  
    useEffect(() => {
      if (!senderId || !receiverId) {
        console.log("IDs not available yet.");
        return;
      }
    
      socket.on("message", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    
      axios
        .get(`https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/messages/messages/${senderId}/${receiverId}`)
        .then((response) => {
          setMessages(response.data);
        })
        .catch((err) => {
          console.error("Failed to load messages:", err);
        });
    
      return () => socket.off("message");
    }, [senderId, receiverId]);
  
    const sendMessage = () => {
      if (input.trim()) {
        const messageData = {
          senderId: senderId,
          receiverId: receiverId,
          message: input,
        };
        socket.emit("sendMessage", messageData);
        axios
          .post("https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/messages/messages", messageData)
          .then((response) => {
            console.log("Message saved:", response.data);
            setMessages(prevMessages => [...prevMessages, response.data]); // Update message list immediately
          })
          .catch((error) => {
            console.error("Failed to save message:", error);
          });
        setInput("");
      }
    };
  
    return (
      <div>
        <div>
          {messages.map((msg, index) => (
            <p key={index}>
              <strong>{msg.senderId || "User"}:</strong> {msg.message}
            </p>
          ))}
        </div>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={sendMessage}>Send</button>
      </div>
    );
  }
  

export default Chat;
