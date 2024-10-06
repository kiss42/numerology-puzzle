import React, { useState, useEffect } from "react";
import { displayHearts, reduceLives } from "../utilities/heart";  // Importing lives logic
import HintButton from "./HintButton";  // Import the HintButton

function HexPuzzle() {
  const [numbers, setNumbers] = useState([]);
  const [missingNumber, setMissingNumber] = useState("");
  const [lives, setLives] = useState(5);
  const [showAnswer, setShowAnswer] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(null);

  // Generate random base number and numbers that follow the same pattern
  useEffect(() => {
    const base = Math.floor(Math.random() * 10) + 10; // Generate random base number between 10 and 20
    const generatedNumbers = [
      base,         // Row 1 numbers
      base + 3,     // Incremented by 3
      base + 5,     // Incremented by 5
      base + 8,     // Incremented by 8
      base + 10,    // Incremented by 10
      base + 6,     // Row 2 numbers
      base + 14,    // Incremented by 14
      base + 19,    // Incremented by 19
      base + 24,    // Incremented by 24
    ];
    setCorrectAnswer(base + 29);  // The missing number is base + 29
    setNumbers(generatedNumbers);
  }, []);

  const hint = "Hint: Look at how each number increases by a fixed amount. Try figuring out the pattern!";

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
    window.location.reload();  // Reload page to reset the puzzle
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
        <div className="hexagon bg-blue-500 text-white flex items-center justify-center">{numbers[0]}</div>
        <div className="hexagon bg-blue-500 text-white flex items-center justify-center">{numbers[1]}</div>
        <div className="hexagon bg-blue-500 text-white flex items-center justify-center">{numbers[2]}</div>
        <div className="hexagon bg-blue-500 text-white flex items-center justify-center">{numbers[3]}</div>
        <div className="hexagon bg-blue-500 text-white flex items-center justify-center">{numbers[4]}</div>

        {/* Row 2 */}
        <div className="hexagon bg-blue-500 text-white flex items-center justify-center">{numbers[5]}</div>
        <div className="hexagon bg-blue-500 text-white flex items-center justify-center">{numbers[6]}</div>
        <div className="hexagon bg-blue-500 text-white flex items-center justify-center">{numbers[7]}</div>
        <div className="hexagon bg-blue-500 text-white flex items-center justify-center">{numbers[8]}</div>
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
        <div className="hexagon bg-blue-500 text-white flex items-center justify-center">{numbers[0]}</div>
        <div className="hexagon bg-blue-500 text-white flex items-center justify-center">{numbers[1]}</div>
        <div className="hexagon bg-blue-500 text-white flex items-center justify-center">{numbers[2]}</div>
        <div className="hexagon bg-blue-500 text-white flex items-center justify-center">{numbers[3]}</div>
        <div className="hexagon bg-blue-500 text-white flex items-center justify-center">{numbers[4]}</div>
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
