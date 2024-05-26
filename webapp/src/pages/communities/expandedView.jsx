import React from "react";
import UserList from "./userList";

function ExpandedUserView({
  users,
  similarities,
  toggleExpand,
  showSimilarities,
}) {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-white p-2 transition-all duration-500 ease-in-out">
      <button
        onClick={toggleExpand}
        className="absolute top-4 right-4 text-lg font-bold text-black"
      >
        Вийти
      </button>
      <div
        className="pt-12 overflow-auto"
        style={{ maxHeight: "calc(100vh - 120px)" }}
      >
        <UserList
          users={users}
          similarities={similarities}
          showSimilarities={showSimilarities}
        />
      </div>
    </div>
  );
}

export default ExpandedUserView;
