import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const UsersContext = createContext();

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
};

let person = {name: "Wtf" }

const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(
          "https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/users/all"
        );
        const usersData = response.data.userss;
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchUsers();
  }, []);


  return (
    <UsersContext.Provider value={{ users, person }}>
      {children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;
