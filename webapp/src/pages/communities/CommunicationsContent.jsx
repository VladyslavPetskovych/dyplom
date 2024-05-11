import React from "react";
import ChatList from "./chatList";

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
      <ChatList/>
    </div>
  );
}

export default CommunicationsContent;
