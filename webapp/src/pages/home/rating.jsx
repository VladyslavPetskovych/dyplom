import React, { useState } from "react";

function Rating({ onRatingSelect }) {
  const [selectedRating, setSelectedRating] = useState(null);

  const handleRatingSelect = (value) => {
    setSelectedRating(value);
    onRatingSelect(value);
  };

  return (
    <div>
      <ul className="flex items-center justify-center">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            className={`p-1 mx-1 ${selectedRating === value ? 'bg-violet-700' : ''} focus:ring-violet-300`}
            onClick={() => handleRatingSelect(value)}
          >
            {value}
          </button>
        ))}
      </ul>
    </div>
  );
}

export default Rating;
