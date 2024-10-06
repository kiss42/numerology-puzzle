import React, { useState } from "react";
import PuzzleInstruction from "./PuzzleInstruction";  
import { calculatePuzzleTwoAnswers } from "../utilities/puzzleLogic";  
import { displayHearts, reduceLives } from "../utilities/heart";  // Corrected imports
import HintButton from "./HintButton";  // Import the HintButton


function PuzzleTwo() {
  const hint = "Check how the numbers are connected. You might be able to guess the missing ones by looking at their neighbors!";
  const [inputs, setInputs] = useState({
    missing1: "",
    missing2: "",
  });
  const [feedback, setFeedback] = useState({
    correct1: false,
    correct2: false,
  });
  const [lives, setLives] = useState(5);  // Initial lives (hearts)
  const [showAnswers, setShowAnswers] = useState(false);  
  const [submitted, setSubmitted] = useState(false);  

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
    setSubmitted(false);  
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const feedback = calculatePuzzleTwoAnswers(inputs);  // Use Puzzle Two logic
    
    if (!feedback.correct1 || !feedback.correct2) {
      setLives(reduceLives(lives));  // Use correct utility function
    }

    setFeedback(feedback);
    setSubmitted(true);  

    if (lives - 1 <= 0) {
      setShowAnswers(true);  // Show correct answers when lives run out
    }
  };

  const resetGame = () => {
    setInputs({ missing1: "", missing2: "" });
    setFeedback({ correct1: false, correct2: false });
    setLives(5);  
    setShowAnswers(false);
    setSubmitted(false);  
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Numerology Puzzle 2</h1>

      <PuzzleInstruction />

      {/* Display Lives */}
      <div className="flex space-x-2 mb-6">
        {displayHearts(lives)}  {/* Use correct utility function */}
      </div>

      {/* Puzzle Layout */}
      <div className="relative mt-6">
        {/* Layout of puzzle goes here */}
        <div className="flex justify-center items-center mb-8">
          <div className="bg-blue-300 w-16 h-16 rounded-full flex items-center justify-center text-xl">54</div>
        </div>

        <div className="flex justify-center items-center space-x-8 mb-8">
          <div className="bg-blue-300 w-16 h-16 rounded-full flex items-center justify-center text-xl">28</div>
          <div className="bg-blue-300 w-16 h-16 rounded-full flex items-center justify-center text-xl">26</div>
        </div>

        <div className="flex justify-center items-center space-x-8 mb-8">
          <div className="bg-blue-300 w-16 h-16 rounded-full flex items-center justify-center text-xl">15</div>
          <div className="bg-blue-300 w-16 h-16 rounded-full flex items-center justify-center text-xl">
            {showAnswers ? (
              <span>{feedback.correctAnswer1}</span>  // Show correct answer
            ) : (
              <input
                type="number"
                name="missing1"
                value={inputs.missing1}
                onChange={handleChange}
                className="text-center w-full bg-transparent"
                placeholder="?"
              />
            )}
          </div>
        </div>

        <div className="flex justify-center items-center space-x-8 mb-8">
          <div className="bg-blue-300 w-16 h-16 rounded-full flex items-center justify-center text-xl">
            {showAnswers ? (
              <span>{feedback.correctAnswer2}</span>  // Show correct answer
            ) : (
              <input
                type="number"
                name="missing2"
                value={inputs.missing2}
                onChange={handleChange}
                className="text-center w-full bg-transparent"
                placeholder="?"
              />
            )}
          </div>
          <div className="bg-blue-300 w-16 h-16 rounded-full flex items-center justify-center text-xl">12</div>
        </div>

        {!showAnswers && (
          <form onSubmit={handleSubmit} className="mt-6">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Check Answers
            </button>
          </form>
        )}

         {/* Hint Button */}
      <HintButton hint={hint} />

        {showAnswers && (
          <div className="mt-4">
            <button
              onClick={resetGame}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Try Again
            </button>

            
          </div>
        )}

        {!showAnswers && submitted && lives > 0 && (
          <div className="mt-4 text-red-500">
            {feedback.correct1 && feedback.correct2 ? "Correct!" : "Try Again!"}
          </div>
        )}

        {showAnswers && (
          <div className="mt-4 text-red-500">
            Game Over! The correct answers are {feedback.correctAnswer1} and {feedback.correctAnswer2}.
          </div>
        )}
      </div>
    </div>
  );
}

export default PuzzleTwo;
