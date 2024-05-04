import React, { useState, useEffect } from "react";
import "./previousAnswers.css";
import PreviousAnswersList from "./previousAnswersList";

function PreviousAnswers() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleWindow = () => {
    setIsOpen(!isOpen);
  };
  const closeWindow = () => {
    document.querySelector(".sliding-window").classList.add("slide-out");
    setTimeout(() => {
      document.querySelector(".sliding-window").classList.remove("slide-out");
      setIsOpen(false);
    }, 200);
  };

  useEffect(() => {
    const handleScroll = (e) => {
      const slidingWindow = document.querySelector(".sliding-window");
      if (isOpen && slidingWindow && slidingWindow.contains(e.target)) {
        return;
      }

      if (isOpen) {
        e.preventDefault();
      }
    };

    if (isOpen) {
      document.body.addEventListener("wheel", handleScroll, { passive: false });
      document.body.addEventListener("touchmove", handleScroll, {
        passive: false,
      });
    } else {
      document.body.removeEventListener("wheel", handleScroll);
      document.body.removeEventListener("touchmove", handleScroll);
    }

    return () => {
      document.body.removeEventListener("wheel", handleScroll);
      document.body.removeEventListener("touchmove", handleScroll);
    };
  }, [isOpen]);

  return (
    <div>
      <button
        className="bg-sky-500 p-2 text-sm font-bold m-1 rounded"
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
            onClick={toggleWindow}
          ></div>
          {/* Sliding window */}
          <div
            className={`bg-slate-600 fixed top-0 left-0 h-full z-50 overflow-y-auto sliding-window ${
              isOpen ? "slide-in" : isOpen === false && "slide-out"
            }`}
            style={{
              width: "84vw",
              transform: isOpen ? "translateX(0)" : "translateX(-100%)",
              transition: "transform 1s linear",
            }}
          >
            <div className="flex flex-row my-auto bg-slate-700">
              <button
                className="absolute top-0 right-0 m-2 mr-5 text-white  "
                onClick={closeWindow}
              >
                Close
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
