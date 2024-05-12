import React, { useState } from "react";
import CommunitiesContent from "./CommunitiesContent";
import CommunicationsContent from "./CommunicationsContent";
import UsersAbs from "./usersAbs";
import "./communities.css";

function Communities() {
  const [isCommunities, setIsCommunities] = useState(true);
  const [animationStyle, setAnimationStyle] = useState({});
  const [usersAbsOpacity, setUsersAbsOpacity] = useState(1);

  const togglePage = () => {
    setUsersAbsOpacity(0);
    setAnimationStyle({
      animation: isCommunities
        ? "slideOutLeft 0.5s ease-in-out forwards"
        : "slideOutRight 0.5s ease-in-out forwards",
    });

    setTimeout(() => {
      setIsCommunities(!isCommunities);
      setAnimationStyle({
        animation: isCommunities
          ? "slideInRight 0.5s ease-in-out forwards"
          : "slideInLeft 0.5s ease-in-out forwards",
      });
      setUsersAbsOpacity(1);
    }, 500);
  };

  return (
    <div className="bg-slate-400 min-h-screen">
      <div className="bg-slate-400 flex-1 overflow-y-auto p-5">
        <div className="flex items-center justify-between p-3">
          <h1 className="text-xl font-bold">
            {isCommunities ? "Cпільноти" : "Cпілкування"}
          </h1>
          <button
            className="py-2 px-1 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            onClick={togglePage}
          >
            {isCommunities ? "Перейти до спілкування" : "Перейти до Cпільнот"}
          </button>
        </div>

        <div className="page-container" style={animationStyle}>
          {isCommunities ? <CommunicationsContent /> : <CommunitiesContent /> }
        </div>
      </div>
      <UsersAbs opacity={usersAbsOpacity} />
    </div>
  );
}

export default Communities;
