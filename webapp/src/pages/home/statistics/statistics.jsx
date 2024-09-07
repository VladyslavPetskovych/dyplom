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
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [chatId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const { name, img, answers, posts, age, sex, city } = user;



  const normalizedSex = sex?.trim().toLowerCase();
  const displaySex =
    normalizedSex === "female" ? "жін" : normalizedSex === "male" ? "чол" : sex;

  return (
    <div>
      <div className="bg-gradient-to-r from-logo1 to-logo2 h-full shadow-none py-3 flex flex-col items-center justify-center">
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
              <p className="pb-1">
                {"Вік: "} {age}
              </p>
              <p className="pb-1">
                {"Звідки: "} {city}
              </p>
              <p className="pb-1">
                {"Стать: "} {displaySex}
              </p>
            </div>
          </div>
        </div>
        <Interests chatId={chatId} />
      </div>
    </div>
  );
}

export default Statistics;
