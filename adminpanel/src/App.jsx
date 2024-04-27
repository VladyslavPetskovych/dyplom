import React, { useState } from "react";
import axios from "axios";
import Category from "./components/category";
import Home from './home'

function App() {

  return (
    <div className="bg-black h-screen">
      <p className="bg-red-300 h-10 text-2xl w-full">
        Адмін панелька для телеграм боту дипломної роботи
      </p>
      <div>
        <Category />
      </div>
      <Home/>
    </div>
  );
}

export default App;
