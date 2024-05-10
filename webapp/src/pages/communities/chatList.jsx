import React, { useState, useEffect } from 'react';
import ChatButton from './chatButton';
import axios from 'axios';

function ChatList({ currentUserId }) {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    // Fetching chats from a mock API endpoint that should be replaced with your actual API
    axios.get(`http://your-server-url.com/api/chats/${currentUserId}`)
      .then(response => {
        const chatData = response.data.map(chat => ({
          id: chat.id,
          name: chat.partnerName,  // Assuming API returns the name of the chat partner
          lastMessage: chat.lastMessage
        }));
        setChats(chatData);
      })
      .catch(error => console.error("Failed to fetch chats:", error));
  }, [currentUserId]);

  const handleChatClick = (chat) => {
    // Here you can handle navigation or opening the chat details
    console.log('Chat clicked:', chat);
  };

  return (
    <ul>
      {chats.map(chat => (
        <ChatButton key={chat.id} chat={chat} onClick={handleChatClick} />
      ))}
    </ul>
  );
}

export default ChatList;
