import React, { useState } from "react";
import TreePuzzle from "./components/TreePuzzle";    // Puzzle 1
import PuzzleTwo from "./components/PuzzleTwo";      // Puzzle 2
import HexPuzzle from "./components/HexPuzzle";      // Hexagonal Puzzle (Puzzle 3)
import PuzzleInstruction from "./components/PuzzleInstruction";  // Instructions

function App() {
  const [currentPuzzle, setCurrentPuzzle] = useState(1);

  return (
    <div className="App min-h-screen bg-gray-100 p-6 flex flex-col items-center justify-center">
      
      {/* Title at the top */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Numbers Game</h1>
      </header>

      {/* Instructions for the current puzzle */}
      <PuzzleInstruction currentPuzzle={currentPuzzle} />

      <div className="flex justify-center space-x-4 my-4">
        {/* Buttons to switch between puzzles */}
        <button
          onClick={() => setCurrentPuzzle(1)}
          className={`px-6 py-3 text-lg font-semibold rounded-lg transition-all focus:outline-none ${
            currentPuzzle === 1 ? "bg-blue-500 text-white shadow-md" : "bg-gray-300 text-gray-700 hover:bg-gray-400"
          }`}
        >
          Puzzle 1
        </button>
        <button
          onClick={() => setCurrentPuzzle(2)}
          className={`px-6 py-3 text-lg font-semibold rounded-lg transition-all focus:outline-none ${
            currentPuzzle === 2 ? "bg-blue-500 text-white shadow-md" : "bg-gray-300 text-gray-700 hover:bg-gray-400"
          }`}
        >
          Puzzle 2
        </button>
        <button
          onClick={() => setCurrentPuzzle(3)}
          className={`px-6 py-3 text-lg font-semibold rounded-lg transition-all focus:outline-none ${
            currentPuzzle === 3 ? "bg-blue-500 text-white shadow-md" : "bg-gray-300 text-gray-700 hover:bg-gray-400"
          }`}
        >
          Puzzle 3 (Hex)
        </button>
      </div>

      {/* Render the correct puzzle based on user selection */}
      <div className="mt-8 w-full max-w-3xl">
        {currentPuzzle === 1 && <TreePuzzle />}
        {currentPuzzle === 2 && <PuzzleTwo />}
        {currentPuzzle === 3 && <HexPuzzle />}
      </div>
    </div>
  );
}

export default App;
