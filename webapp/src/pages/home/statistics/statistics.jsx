import React, { useEffect, useState } from "react";
import axios from "axios";

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
  const totalAnswers = answers.length;

  return (
    <div>
      <div className="bg-slate-500 h-full py-3 flex flex-col items-center justify-center">
        <div className="flex flex-row">
          <img
            className="w-32 h-32 object-cover"
            src={`https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/usersPics/${img}`}
            alt=""
          />
          <div className="flex flex-col text-xs">
            <div>
              <p>{"ім'я: "} {name}</p>
            </div>
            <div className="">
              <span className=" ">Загалом ви відповіли на </span>
              <span className="">{totalAnswers} питань</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
