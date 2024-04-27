import React, { useEffect } from "react";
const tg = window.Telegram.WebApp;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Communities from "./pages/communities";
import Profile from "./pages/profile/profile";
import FooterMenu from "./component/footerMenu";
import { useDispatch } from "react-redux";
import { setChatId } from "./redux/store";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    tg.ready();
    //dispatch(setChatId(tg.initDataUnsafe.user.id));
     dispatch(setChatId(938729564));
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/communities" element={<Communities />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <FooterMenu />
      {/* <p>{tg.initDataUnsafe.user.id}</p>
      <pre className="mt-[1000px]">
        {JSON.stringify(tg.initData.user, null, 2)}
      </pre>
      <p>--------------</p>
      <pre className="">{JSON.stringify(tg.initDataUnsafe.user, null, 2)}</pre>
      <pre className="mt-[1000px]">
        {JSON.stringify(tg.initDataUnsafe, null, 2)}
      </pre> */}
    </BrowserRouter>
  );
}

export default App;
