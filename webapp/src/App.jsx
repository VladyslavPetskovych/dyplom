import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Communities from "./pages/communities";
import Profile from "./pages/profile";
import FooterMenu from "./component/footerMenu";

function App() {
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
