import React, { useState, useEffect, useRef } from "react";
import axios from "axios"; // Import Axios
import { socket } from "../components/socket";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ShowUser from "./showUser";
import { format } from "date-fns";

function Chat() {
  const { receiverId: receiverIdString } = useParams(); // Assuming you're receiving a string
  const receiverId = parseInt(receiverIdString); // Convert string ID to integer
  const senderId = parseInt(useSelector((state) => state.user.chatId)); // Convert string ID to integer, if necessary
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

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
  }, [senderId, receiverId]); // Re-run when senderId or receiverId changes

  const sendMessage = () => {
    if (input.trim()) {
      const messageData = {
        senderId,
        receiverId,
        message: input,
        timestamp: new Date(),
      };

      // Emit the message to the server
      socket.emit("sendMessage", messageData);
      setInput(""); // Clear the input field after sending
    }
  };
  useEffect(() => {
    if (messages.length > 0) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="bg-slate-600 text-white flex flex-col h-[85vh] relative">
      <div className="flex flex-col flex-grow overflow-auto">
        {messages.map((msg, index) => (
          <div key={index} className="border bg-slate-700 p-1 m-1 flex justify-between">
            <strong className="mr-2">
              {msg.senderId === senderId ? (
                <ShowUser chatId={senderId} />
              ) : (
                <ShowUser chatId={receiverId} />
              )}
            </strong>
            <span className="break-all">{msg.message}</span>
            <div className="text-xs text-gray-500">
              {format(new Date(msg.timestamp), "p")}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="flex bg-slate-500 p-3 sticky bottom-0 w-full">
        <input
          className="flex-1 text-black p-2 rounded-l"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          className="bg-black hover:bg-blue-700 text-white p-2 rounded-r"
          onClick={sendMessage}
        >
          ↪
        </button>
      </div>
    </div>
  );
}

export default Chat;
