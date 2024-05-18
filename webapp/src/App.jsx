import React, { useEffect } from "react";
const tg = window.Telegram.WebApp;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Communities from "./pages/communities/communities";
import Profile from "./pages/profile/profile";
import FooterMenu from "./components/footerMenu";
import UserPage from "./components/UserPage/UserPage";
import Chat from "./pages/chat/chat.jsx";
import { useDispatch } from "react-redux";
import { setChatId } from "./redux/store";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    tg.ready();
    dispatch(setChatId(tg.initDataUnsafe.user.id));
   // dispatch(setChatId(938729564));
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/communities" element={<Communities />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user/:userId" element={<UserPage />} />
        <Route path="/chat/:receiverId" element={<Chat />} />
      </Routes>
      <FooterMenu />

      <div>

        
        {/*  <p>{tg.initDataUnsafe.user.id}</p>
        <pre className="mt-[1000px] text-white">
          {JSON.stringify(tg.initData.user, null, 2)}
        </pre>
        <p>--------------</p>
        <pre className="">
          {JSON.stringify(tg.initDataUnsafe.user, null, 2)}
        </pre>
        <pre className="mt-[1000px]">
          {JSON.stringify(tg.initDataUnsafe, null, 2)}
        </pre> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
