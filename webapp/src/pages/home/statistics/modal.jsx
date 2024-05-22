// src/components/Modal.js

import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800  bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-black  p-6 rounded-lg  w-[100vw] max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm">
            <h2 className="text-xl font-bold">Оберіть свої захоплення</h2>
            <h2 className="text-sm font-bold">Не більше 5-ти</h2>
          </div>

          <button onClick={onClose}>
            <FaTimes className="text-red-700 text-3xl" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
