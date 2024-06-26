import React from "react";
import ChatList from "./chatList";
import UsersAllbut from "./usersAllbut";

function CommunicationsContent({ onUsersAllbutToggle }) {
  return (
    <div className="p-4 bg-black bg-opacity-75 rounded-xl h-full overflow-y-auto text-white mb-24" >
      <div className="flex flex-row justify-between items-center mb-5">
        <p className="text-xl font-bold">Чати:</p>
        <UsersAllbut onToggleExpand={onUsersAllbutToggle} />
      </div>

      <ChatList />
    </div>
  );
}

export default CommunicationsContent;
