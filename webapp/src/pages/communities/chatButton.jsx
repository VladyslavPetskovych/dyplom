import React, { useState, useEffect } from "react";
import { FiMessageCircle } from "react-icons/fi";
import { getUserData } from '../../components/fetchUser'; 
import { Link } from "react-router-dom";

function ChatButton({ chat, currentUserId }) {
  const [otherUser, setOtherUser] = useState(null); 

  useEffect(() => {
    if (chat.participants.length > 2 || chat.chatName) {
      // For group chat
      setOtherUser({ user: { name: chat.chatName, chatId: chat._id } });
    } else {
      const otherUserId = chat.participants.find(id => id !== currentUserId);

      if (otherUserId) {
        getUserData(otherUserId)
          .then(userData => {
            if (userData) {
              setOtherUser(userData); // Store user data in state
            }
          })
          .catch(error => {
            console.error('Error fetching user data:', error);
            setOtherUser(null); 
          });
      }
    }
  }, [chat, currentUserId]); 

  if (!otherUser) {
    return <p>Loading...</p>; 
  }

  return (
    <div className="flex flex-row justify-center items-center m-1 ">
      <FiMessageCircle className="text-white mr-2" size={24} />
      <Link 
        to={`/chat/${otherUser.user.chatId}`}
        className="bg-logo3 flex-grow hover:bg-blue-700 text-white font-base font-josefin py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {chat.participants.length > 2 ? otherUser.user.name : `Chat with ${otherUser.user.name || 'anon'}`}
      </Link>
    </div>
  );
}

export default ChatButton;
