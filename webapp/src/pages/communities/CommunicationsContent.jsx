import React from "react";
import { FiMessageCircle } from 'react-icons/fi'; // Importing an icon from react-icons
//import ChatList from "./chatList";

function CommunicationsContent() {
  // Mock data - replace this with actual data fetching logic
  const users = [
    { id: 1, name: "John Doe", lastMessage: "Hey, how's it going?" },
    { id: 2, name: "Jane Smith", lastMessage: "Let's meet tomorrow!" },
    { id: 3, name: "Alice Johnson", lastMessage: "Did you send the files?" },
  ];

  return (
    <div className="p-4 bg-blue-600 h-full overflow-y-auto text-white">
      <p className="text-xl font-bold mb-4">Чати:</p>
      
      <ul>
        {users.map(user => (
          <li key={user.id} className="bg-blue-800 hover:bg-blue-700 rounded-lg p-3 shadow mb-2 cursor-pointer transition-colors duration-200 ease-in-out">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FiMessageCircle className="text-white mr-2" size={24} />
                <h3 className="font-semibold">{user.name}</h3>
              </div>
              <p className="text-gray-400 text-sm">{user.lastMessage}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommunicationsContent;
