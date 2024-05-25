import React, { useState, useEffect } from "react";
import "./previousAnswers.css";
import PreviousAnswersList from "./previousAnswersList";

function PreviousAnswers() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleWindow = () => {
    if (!isOpen) {
      document.body.classList.add("body-no-scroll");
    } else {
      document.body.classList.remove("body-no-scroll");
    }
    setIsOpen(!isOpen);
  };

  const closeWindow = () => {
    const slidingWindow = document.querySelector(".sliding-window");
    if (slidingWindow) {
      slidingWindow.classList.add("slide-out");
    }
    setTimeout(() => {
      if (slidingWindow) {
        slidingWindow.classList.remove("slide-out");
      }
      document.body.classList.remove("body-no-scroll");
      setIsOpen(false);
    }, 200);
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      document.body.classList.remove("body-no-scroll");
    };
  }, []);

  return (
    <div className="px-2">
      <button
        className="bg-logo3 p-2 text-sm font-bold m-1 rounded"
        style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.65)" }}
        onClick={toggleWindow}
      >
        Попередні відповіді
      </button>
      
      {isOpen && (
        <div>
          {/* Background overlay */}
          <div
            className="fixed top-0 left-0 w-screen h-screen bg-black opacity-50 z-40"
            onClick={closeWindow}
          ></div>
          {/* Sliding window */}
          <div
            className={`bg-black bg-opacity-70 fixed top-0 left-0 h-full z-50 overflow-y-auto sliding-window ${
              isOpen ? "slide-in" : "slide-out"
            }`}
            style={{
              width: "88vw",
              transform: isOpen ? "translateX(0)" : "translateX(-100%)",
              transition: "transform 1s linear",
            }}
          >
            <div className="flex flex-row my-auto bg-black">
              <button
                className="absolute top-0 right-0 m-2 mr-5 text-white"
                onClick={closeWindow}
              >
                Закрити
              </button>
              <div className="m-2">
                <p>Ваші Попередні відповіді</p>
              </div>
            </div>
            <div>
              <PreviousAnswersList />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PreviousAnswers;
