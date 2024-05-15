import React from 'react';
import { Link } from "react-router-dom";
import defaultUserImage from "../../assets/default/defUser.jpg";

function UserList({ users, similarities, showSimilarities }) {
  const similarityMap = similarities.reduce((map, sim) => {
    map[sim.userId] = sim.similarity.toFixed(3);
    return map;
  }, {});

  return (
    <div className="flex flex-col space-y-2 overflow-auto">
      {users.map((user) => {
        const userSimilarity = showSimilarities ? similarityMap[user._id] || 'N/A' : '';
        return (
          <Link
            to={`/user/${user.chatId}`}
            key={user._id}
            className="bg-slate-200 rounded px-3 py-1 flex items-center justify-between space-x-2 w-full"
          >
            <div className="flex items-center space-x-2">
              <img
                src={user.img ? `https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/usersPics/${user.img}` : defaultUserImage}
                alt={user.name || "anon"}
                className="h-10 w-10 rounded-full"
              />
              <span className='text-black'>{user.name || "anon"}</span>
            </div>
            {showSimilarities && <span className="text-gray-600"> (Схожість: {userSimilarity})</span>}
          </Link>
        );
      })}
    </div>
  );
}

export default UserList;
