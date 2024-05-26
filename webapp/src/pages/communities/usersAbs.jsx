/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import UserList from "./userList";
import ExpandedUserView from "./expandedView";

function UsersAbs({ opacity }) {
  const [users, setUsers] = useState([]);
  const [similarities, setSimilarities] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const chatId = useSelector((state) => state.user.chatId);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userResponse = await axios.get(
          "https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/users/all"
        );
        setUsers(userResponse.data.userss || []);

        if (chatId) {
          const simResponse = await axios.get(
            `https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/findSimiliarUsers/${chatId}`
          );
          setSimilarities(simResponse.data.similarities || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setUsers([]);
        setSimilarities([]);
      }
    };

    fetchUsers();
  }, [chatId]);

  const toggleExpand = () => {
    setExpanded(!expanded);
    if (!expanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  return (
    <div style={{ opacity }}>
      {expanded ? (
        <ExpandedUserView
          users={users}
          similarities={similarities}
          toggleExpand={toggleExpand}
          showSimilarities={true}
        />
      ) : (
        <CompactUserView
          users={users}
          similarities={similarities}
          toggleExpand={toggleExpand}
          showSimilarities={false}
        />
      )}
    </div>
  );
}

function CompactUserView({
  users,
  similarities,
  toggleExpand,
  showSimilarities,
}) {
  const numberOfUsersShown = 2;
  const additionalUsersCount =
    users.length > numberOfUsersShown ? users.length - numberOfUsersShown : 0;

  return (
    <div className="fixed bottom-[105px] right-[10px] w-[150px] bg-black bg-opacity-85 text-white rounded p-2 transition-all duration-500 ease-in-out">
      <UserList
        users={users.slice(0, numberOfUsersShown)}
        similarities={similarities}
        showSimilarities={showSimilarities}
      />
      {additionalUsersCount > 0 && (
        <div
          className="text-center text-black text-sm font-medium p-1 mt-2 bg-slate-200"
          onClick={toggleExpand}
        >
          +{additionalUsersCount} користувачів...
        </div>
      )}
    </div>
  );
}

export default UsersAbs;
