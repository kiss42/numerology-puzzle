import React from "react";

function PuzzleInstruction({ currentPuzzle }) {
  let instructionText = "";

  // Set simple and clear instructions based on the current puzzle
  switch (currentPuzzle) {
    case 1:
      instructionText = `Puzzle 1: 
      Look at the numbers on the tree. Some numbers are missing. 
      Your job is to fill in the missing numbers by thinking about how the numbers might grow or connect together!`;
      break;
    case 2:
      instructionText = `Puzzle 2: 
      This puzzle has numbers in circles. Two of the circles are missing numbers.
      Look at the other numbers to figure out what should go in the empty circles!`;
      break;
    case 3:
      instructionText = `Puzzle 3: 
      This puzzle is shaped like a honeycomb with lots of numbers inside. 
      One honeycomb is empty. Your job is to figure out which number should go in the empty honeycomb!`;
      break;
    default:
      instructionText = "";  // No text when no puzzle is selected
  }

  return instructionText ? (
    <div className="mb-6 p-6 bg-white shadow-lg rounded-lg text-center max-w-2xl mx-auto">
      <h2 className="text-lg font-semibold text-gray-800">{instructionText}</h2>
    </div>
  ) : null;
}

export default PuzzleInstruction;
