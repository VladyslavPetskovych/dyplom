import React from "react";
import logo from '../assets/logo/u3bOFRH1Y5gHT-zsopyMC-transformed.webp'
const tg = window.Telegram.WebApp;

function Header() {

  function onClose(){
    tg.close();
  }

  return (
    <div className="flex flex-row text-black bg-gradient-to-r from-logo1 to-logo2 justify-between h-12">
      <div className="relative m-2 ml-5 text-xl flex flex-row">
        <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-50"></span>
        <img src={logo} className="h-20 w-20 rounded-full object-cover -mt-6" alt="" />

        <p>Здибанка Бот </p>
      </div>
      <button className="bg-logo2 w-24" onClick={onClose}>❌</button>
    </div>
  );
}

export default Header;
