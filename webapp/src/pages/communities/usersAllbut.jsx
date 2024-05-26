/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import UserList from "./userList";
import ExpandedUserView from "./expandedView";

function UsersAllbut({ onToggleExpand }) {
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
    const newExpandedState = !expanded;
    setExpanded(newExpandedState);
    onToggleExpand(newExpandedState);
  };

  return (
    <div>
      {expanded ? (
        <ExpandedUserView
          users={users}
          similarities={similarities}
          toggleExpand={toggleExpand}
          showSimilarities={true}
        />
      ) : (
        <CompactUserView toggleExpand={toggleExpand} />
      )}
    </div>
  );
}

function CompactUserView({ toggleExpand }) {
  return (
    <div className="transition-all duration-500 ease-in-out">
      <button onClick={toggleExpand} className="text-sm font-bold underline">
        Усі користувачі
      </button>
    </div>
  );
}

export default UsersAllbut;
