import React from 'react';
import { FiMessageCircle } from 'react-icons/fi'; // Using an icon for styling

function ChatButton({ chat, onClick }) {
  return (
    <li className="bg-blue-800 hover:bg-blue-700 rounded-lg p-3 shadow mb-2 cursor-pointer transition-colors duration-200 ease-in-out" onClick={() => onClick(chat)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <FiMessageCircle className="text-white mr-2" size={24} />
          <h3 className="font-semibold">{chat.name}</h3>  {/* Displaying the chat partner's name */}
        </div>
        <p className="text-gray-400 text-sm">{chat.lastMessage}</p>  {/* Last message preview */}
      </div>
    </li>
  );
}

export default ChatButton;
