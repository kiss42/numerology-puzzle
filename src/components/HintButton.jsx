import React, { useState } from "react";

function HintButton({ hint }) {
  const [showHint, setShowHint] = useState(false);

  return (
    <div className="mt-4">
      <button
        onClick={() => setShowHint(!showHint)}
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
      >
        {showHint ? "Hide Hint" : "Show Hint"}
      </button>

      {showHint && (
        <div className="mt-2 p-4 bg-yellow-100 text-yellow-900 rounded-lg shadow-lg">
          <p>{hint}</p>
        </div>
      )}
    </div>
  );
}

export default HintButton;
