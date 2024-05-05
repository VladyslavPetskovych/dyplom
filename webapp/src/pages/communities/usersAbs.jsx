import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  return (
    <div style={{ opacity: opacity }} className={`absolute ${expanded ? 'top-0 left-0 w-screen h-screen bg-white' : 'bottom-[120px] right-[40px] w-[200px] bg-slate-300'} p-4 transition-all duration-500 ease-in-out`}>

      {expanded ? (
        <button onClick={toggleExpand} className="absolute top-4 right-4 text-lg font-bold">Close</button>
      ) : (
        <button onClick={toggleExpand} className="text-sm font-bold underline">Усі користувачі</button>
      )}
      <div className="flex flex-col space-y-2 overflow-auto">
        {users.slice(0, expanded ? users.length : 2).map(user => (
          <span key={user._id} className="bg-slate-200 rounded px-3 py-1">{user.name}</span>
        ))}
      </div>
    </div>
  );
}

export default UsersAbs;
