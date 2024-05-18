import React, { useState } from "react";
import CommunitiesContent from "./CommunitiesContent";
import CommunicationsContent from "./CommunicationsContent";
import UsersAbs from "./usersAbs";
import "./communities.css";

function Communities() {
  const [isCommunities, setIsCommunities] = useState(true);
  const [animationStyle, setAnimationStyle] = useState({});
  const [usersAbsOpacity, setUsersAbsOpacity] = useState(1);
  const [isUsersAllbutExpanded, setIsUsersAllbutExpanded] = useState(false);

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

  const handleUsersAllbutToggle = (expanded) => {
    setIsUsersAllbutExpanded(expanded);
  };

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-l from-logo1 to-logo2 flex-1 overflow-y-auto p-5">
        <div className="flex items-center justify-between p-3">
          <h1 className="text-xl font-bold">
            {isCommunities ? "Cпілкування" : "Cпільноти"}
          </h1>
          <button
            className="py-2 px-1 bg-gradient-to-r from-logo3 to-blue-700 text-white font-semibold rounded-lg shadow-md hover:from-logo3 hover:to-logo3"
            onClick={togglePage}
          >
            {isCommunities ?"Перейти до Cпільнот"  : "Перейти до спілкування"}
          </button>
        </div>

        <div className="page-container" style={animationStyle}>
          {isCommunities ? (
            <CommunicationsContent
              onUsersAllbutToggle={handleUsersAllbutToggle}
            />
          ) : (
            <CommunitiesContent />
          )}
        </div>
      </div>
      {!isUsersAllbutExpanded && <UsersAbs opacity={usersAbsOpacity} />}
    </div>
  );
}

export default Communities;
