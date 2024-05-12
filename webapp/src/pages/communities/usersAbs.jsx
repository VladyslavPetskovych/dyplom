import React, { useState, useEffect } from 'react';
import axios from 'axios';
import defaultUserImage from '../../assets/default/defUser.jpg'; // Adjust the path as necessary
import { Link } from 'react-router-dom';

function UsersAbs({ opacity }) {
  const [users, setUsers] = useState([]);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    axios.get('https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/users/all')
      .then(response => {
        if (response.data && response.data.userss) {
          setUsers(response.data.userss);
        } else {
          console.error('Users data not found in response:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setUsers([]);
      });
  }, []);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const numberOfUsersShown = 2;
  const additionalUsersCount = users.length > numberOfUsersShown ? users.length - numberOfUsersShown : 0;

  return (
    <div style={{ opacity: opacity }} className={`fixed ${expanded ? 'top-0 left-0 w-screen h-screen bg-white' : 'bottom-[105px] right-[10px] w-[170px] bg-slate-300'} p-2 transition-all duration-500 ease-in-out`}>
      {expanded ? (
        <button onClick={toggleExpand} className="absolute top-4 right-4 text-lg font-bold">Close</button>
      ) : (
        <button onClick={toggleExpand} className="text-sm font-bold underline">Усі користувачі</button>
      )}
      <div className="flex flex-col space-y-2 overflow-auto">
        {users.slice(0, expanded ? users.length : numberOfUsersShown).map(user => (
          <Link to={`/user/${user.chatId}`} key={user._id} className="bg-slate-200 rounded px-3 py-1 flex items-center space-x-2">
            <img src={user.img ? `https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/usersPics/${user.img}` : defaultUserImage}
                 alt={user.name || 'anon'}
                 className="h-10 w-10 rounded-full" />
            <span>{user.name || 'anon'}</span>
          </Link>
        ))}
        {!expanded && additionalUsersCount > 0 && (
          <div className="text-center text-sm font-medium bg-slate-200" onClick={toggleExpand}>
            +{additionalUsersCount} користувачів...
          </div>
        )}
      </div>
    </div>
  );
}

export default UsersAbs;
