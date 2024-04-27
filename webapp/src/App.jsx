import React, { useEffect } from "react";
const tg = window.Telegram.WebApp;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Communities from "./pages/communities";
import Profile from "./pages/profile/profile";
import FooterMenu from "./component/footerMenu";
import { useDispatch } from "react-redux";
import { setChatId } from "../src/redux/store";
function App() {
  useEffect(() => {
    tg.ready();
  }, []);

  
  const dispatch = useDispatch();
  dispatch(setChatId(tg.initDataUnsafe.user.id));
  // dispatch(setChatId(938729564));
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/communities" element={<Communities />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <FooterMenu />
    </BrowserRouter>
  );
}

export default App;
