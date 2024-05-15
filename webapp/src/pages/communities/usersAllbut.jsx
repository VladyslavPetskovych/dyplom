/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import defaultUserImage from "../../assets/default/defUser.jpg";
import UserList from "./userList";
import { useSelector } from "react-redux";
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
        const simResponse = await axios.get(
            `https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/findSimiliarUsers/${chatId}`
        );
        setSimilarities(simResponse.data.similarities || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setUsers([]);
        setSimilarities([]);
      }
    };

    fetchUsers();
  }, []);

  const toggleExpand = () => setExpanded(!expanded);

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
  const numberOfUsersShown = 0;
  const additionalUsersCount =
    users.length > numberOfUsersShown ? users.length - numberOfUsersShown : 0;

  return (
    <div className="   transition-all duration-500 ease-in-out">
      <button onClick={toggleExpand} className="text-sm font-bold underline">
        Усі користувачі
      </button>
    </div>
  );
}

function ExpandedUserView({
  users,
  similarities,
  toggleExpand,
  showSimilarities,
}) {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-white  transition-all duration-500 ease-in-out">
      <button
        onClick={toggleExpand}
        className="absolute top-4 right-4 text-black text-lg font-bold"
      >
        Вийти
      </button>
      <div className="pt-12">
        <UserList
          users={users}
          similarities={similarities}
          showSimilarities={showSimilarities}
        />
      </div>
    </div>
  );
}

export default UsersAbs;
