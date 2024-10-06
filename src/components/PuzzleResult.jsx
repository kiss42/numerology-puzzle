import React from "react";

function Result({ result }) {
  return (
    <div className="mt-4 text-center">
      <p className="text-lg font-semibold">
        Numerology Result: <span className="text-blue-600">{result}</span>
      </p>
    </div>
  );
}

export default Result;
