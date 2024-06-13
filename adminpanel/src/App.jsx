import React, { useState } from "react";
import axios from "axios";
import Category from "./components/category";
import Questions from "./questions";

function App() {
  return (
    <div className="bg-black h-full min-h-screen">
      <p className="bg-logo3 h-full text-2xl w-full p-2 font-oswald">
        ⚙️ Панель керування телеграм боту дипломної роботи
      </p>
      <Category />
      <Questions />
    </div>
  );
}

export default App;
