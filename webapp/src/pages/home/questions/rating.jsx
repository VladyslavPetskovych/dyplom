import React from "react";

function Rating({ selectedRating, onRatingSelect }) {
  const handleRatingSelect = (value) => {
    onRatingSelect(value);
  };

  // Function to determine background color based on value
  const getColorForValue = (value) => {
    if (value <= 2) return 'bg-red-700';   // Red for values 1 and 2
    if (value === 3) return 'bg-yellow-500'; // Yellow for value 3
    return 'bg-green-700';  // Green for values 4 and 5
  };

  return (
    <div className="border p-3 rounded m-3">
      <ul className="flex items-center justify-center m-1">
        <li className="mr-2">😢</li>
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            className={`p-1 px-2 ${getColorForValue(value)}`} // Apply color based on value
            style={{
              marginLeft: value === 1 ? 0 : -1,
              opacity: value === selectedRating ? 1 : 0.7, // Full opacity for selected, half for others
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
