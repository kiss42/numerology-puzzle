import React, { useState } from "react";
import { displayHearts, reduceLives } from "../utilities/heart";  // Importing lives logic
import HintButton from "./HintButton";  // Import the HintButton


function HexPuzzle() {
  const hint = "Hint: Look at the numbers near the missing one. Do they add up or subtract in a way that might help you find the missing number? Try simple addition or subtraction.";
  const [missingNumber, setMissingNumber] = useState("");
  const [lives, setLives] = useState(5);
  const [showAnswer, setShowAnswer] = useState(false);
  const correctAnswer = 29;  // Example correct answer

  const handleSubmit = (e) => {
    e.preventDefault();

    if (parseInt(missingNumber) === correctAnswer) {
      alert("Correct!");
    } else {
      setLives(reduceLives(lives));  // Reduce lives if wrong
      if (lives - 1 <= 0) {
        setShowAnswer(true);
      }
    }
  };

  const resetGame = () => {
    setMissingNumber("");
    setLives(5);
    setShowAnswer(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Display Lives */}
      <div className="mb-6">
        {displayHearts(lives)}
      </div>

      {/* Hexagonal Puzzle */}
      <div className="grid grid-cols-5 gap-4">
        {/* Row 1 */}
        <div className="hexagon bg-blue-500 text-white flex items-center justify-center">5</div>
        <div className="hexagon bg-blue-500 text-white flex items-center justify-center">8</div>
        <div className="hexagon bg-blue-500 text-white flex items-center justify-center">7</div>
        <div className="hexagon bg-blue-500 text-white flex items-center justify-center">9</div>
        <div className="hexagon bg-blue-500 text-white flex items-center justify-center">6</div>

        {/* Row 2 */}
        <div className="hexagon bg-blue-500 text-white flex items-center justify-center">14</div>
        <div className="hexagon bg-blue-500 text-white flex items-center justify-center">14</div>
        <div className="hexagon bg-blue-500 text-white flex items-center justify-center">19</div>
        <div className="hexagon bg-blue-500 text-white flex items-center justify-center">24</div>
        <div className="hexagon bg-blue-500 text-white flex items-center justify-center">
          {showAnswer ? (
            <span>{correctAnswer}</span>
          ) : (
            <input
              type="number"
              value={missingNumber}
              onChange={(e) => setMissingNumber(e.target.value)}
              className="w-full text-center bg-transparent text-white outline-none"
              placeholder="?"
            />
          )}
        </div>

        {/* Row 3 */}
        <div className="hexagon bg-blue-500 text-white flex items-center justify-center">3</div>
        <div className="hexagon bg-blue-500 text-white flex items-center justify-center">2</div>
        <div className="hexagon bg-blue-500 text-white flex items-center justify-center">4</div>
        <div className="hexagon bg-blue-500 text-white flex items-center justify-center">5</div>
        <div className="hexagon bg-blue-500 text-white flex items-center justify-center">4</div>
      </div>

      {!showAnswer && (
        <form onSubmit={handleSubmit} className="mt-6">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Submit Answer
          </button>
        </form>
      )}


      {/* Hint Button */}
      <HintButton hint={hint} />

      {showAnswer && (
        <button
          onClick={resetGame}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

export default HexPuzzle;
