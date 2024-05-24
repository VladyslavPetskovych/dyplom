import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import ChatButton from "./chatButton";

function ChatList() {
  const [chats, setChats] = useState([]);
  const chatId = parseInt(useSelector((state) => state.user.chatId));

  useEffect(() => {
    if (!isNaN(chatId)) {
      const fetchChats = async () => {
        try {
          const response = await axios.get(
            `https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/chats/userChats/${chatId}`
          );
          setChats(response.data);
        } catch (error) {
          console.error("Error fetching chats:", error);
        }
      };

      fetchChats();
    }
  }, [chatId]);

  return (
    <div>
      <ul className="flex flex-col">
        {chats.length === 0 ? (
          <p>No chats available</p>
        ) : (
          chats
            .filter((chat) => !chat.chatName)
            .map((chat) => (
              <li key={chat._id}>
                <ChatButton chat={chat} currentUserId={chatId} />
              </li>
            ))
        )}
      </ul>
    </div>
  );
}

export default ChatList;
