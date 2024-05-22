// src/components/Modal.js

import React from "react";
import { FaTimes } from "react-icons/fa";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-slate-800 p-6 rounded-lg shadow-lg w-3/4 max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Select Your Interests</h2>
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
