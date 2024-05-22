import React, { useEffect, useState } from "react";
import axios from "axios";
import Interests from "./interests";

function Statistics({ chatId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (chatId) {
      axios
        .get(
          `https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/users/getUser/${chatId}`
        )
        .then((response) => {
          setUser(response.data.user);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [chatId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const { name, img, answers, posts } = user;
  

  return (
    <div className="">
      <div className="bg-logo1 h-full shadow-none py-3 flex flex-col items-center justify-center">
        <div className="flex flex-row bg-black w-[96%] p-2 m-2">
          <img
            className="w-32 h-32 object-cover mr-2"
            src={`https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/usersPics/${img}`}
            alt=""
          />
          <div className="flex flex-col text-xs p-2">
            <div>
              <p className="text-sm mb-2">Анкета</p>
              <p className="pb-1">
                {"Ім'я: "} {name}
              </p>
              <p className="pb-1">Вік: 18</p>
              <p className="pb-1">Звідки: Львів</p>
              <p className="pb-1">Стать: Чол</p>
            </div>

          
          </div>
        </div>
        <Interests chatId={chatId} />
      </div>
    </div>
  );
}

export default Statistics;
