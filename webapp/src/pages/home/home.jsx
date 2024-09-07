import { useEffect, useState, useContext } from "react";
import { useUsers } from "../../context/UsersProvider";
import { TextContext } from "../../context/TextProvider";
import { useSelector } from "react-redux";
import {useUser} from '../../context/TextProvider'
import Header from "../../components/header";
import Statistics from "./statistics/statistics";

function Home() {
  const chatId = useSelector((state) => state.user.chatId);

  const { users, person } = useUsers();

  const {user} = useUser();


  console.log(useUser())
  return (
    <div className="bg-logo1 ">
      <div className=" text-white text-base font-popins font-semibold ">
        <Header />
        <Statistics chatId={chatId} />
        <p>{user.name}</p>

        {/* <div>
          <h2>All Users</h2>
          {users.length > 0 ? (
            <ul>
              {users.map((user) => (
                <li key={user._id}>{user.name}</li>
              ))}
            </ul>
          ) : (
            <p>Loading users...</p>
          )}
        </div> */}
      </div>
    </div>
  );
}

export default Home;
