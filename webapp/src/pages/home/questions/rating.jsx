import React from "react";

function Rating({ selectedRating, onRatingSelect }) {
  const handleRatingSelect = (value) => {
    onRatingSelect(value);
  };
  const getColorForValue = (value) => {
    if (value <= 2) return 'bg-red-700';   
    if (value === 3) return 'bg-yellow-500'; 
    return 'bg-green-700';  
  };
  return (
    <div className="border p-3 rounded m-3">
      <ul className="flex items-center justify-center m-1">
        <li className="mr-2">😢</li>
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            className={`p-1 px-2 ${getColorForValue(value)}`} 
            style={{
              marginLeft: value === 1 ? 0 : -1,
              opacity: value === selectedRating ? 1 : 0.7, 
            }}
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
