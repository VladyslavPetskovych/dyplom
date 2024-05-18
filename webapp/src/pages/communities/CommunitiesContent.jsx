import React from "react";
import UsersAbs from "./usersAbs";

function CommunitiesContent() {
  return (
    <div className="p-4 h-full min-h-screen bg-red-400">
      <div className="h-24 bg-red-300 m-1 p-4 rounded-2xl">
        <p>Чат на тему музики:</p>
      </div>
      <div className="h-24 bg-red-300 m-1 p-4 rounded-2xl">
        <p>Чат на тему фільмів:</p>
      </div>
    </div>
  );
}

export default CommunitiesContent;
