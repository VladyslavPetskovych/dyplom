import React from "react";

function Rating({ selectedRating, onRatingSelect }) {
  const handleRatingSelect = (value) => {
    onRatingSelect(value);
  };

  return (
    <div className="border p-3 rounded m-3 ">
      <ul className="flex items-center justify-center m-1 ">
        <li className="mr-2">😢</li>
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            className={`p-1 ${value <= selectedRating && value!== 6 ? (value <= 2 ? 'bg-red-700' : value === 3 ? 'bg-yellow-500' : 'bg-green-700') : ''} focus:ring-violet-300`}
            style={{ marginLeft: value === 1 ? 0 : -1 }}
            onClick={() => handleRatingSelect(value)}
          >
            {value}
          </button>
        ))}
        <li className="ml-2">😀</li>
      </ul>
    </div>
  );
}

export default Rating;
