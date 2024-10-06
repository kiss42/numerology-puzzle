import React, { useState, useEffect } from "react";
import Instruction from "./PuzzleInstruction";  // Import the Instruction component
import HintButton from "./HintButton";  // Import the HintButton

// Function to calculate or check for correct answers based on specific logic
const calculateMissingNumbers = (inputs, correctAnswer1, correctAnswer2) => {
  return {
    correct1: parseInt(inputs.missing1) === correctAnswer1,
    correct2: parseInt(inputs.missing2) === correctAnswer2,
    correctAnswer1,
    correctAnswer2,
  };
};

function NumerologyTreePuzzle() {
  const hint = "Hint: Think about how the numbers are growing. Are they multiplying by something or adding a certain number each time? Try doing the math between the numbers to find the pattern.";

  const [inputs, setInputs] = useState({
    missing1: "",
    missing2: "",
  });
  const [feedback, setFeedback] = useState({
    correct1: false,
    correct2: false,
  });
  const [lives, setLives] = useState(5);  // Initial lives (hearts)
  const [showAnswers, setShowAnswers] = useState(false);  // Track if answers should be shown
  const [submitted, setSubmitted] = useState(false);  // Track whether the form was submitted
  const [numbers, setNumbers] = useState([]);
  const [correctAnswer1, setCorrectAnswer1] = useState(null);
  const [correctAnswer2, setCorrectAnswer2] = useState(null);

  // Generate random numbers when the component mounts
  useEffect(() => {
    const base = Math.floor(Math.random() * 50) + 10; // Generate random base number
    const generatedNumbers = [
      72,              // Static number
      base + 17,       // Random number + pattern
      99,              // Static number
      base + 8,        // Random number + pattern
      base + 20,       // Random number + pattern
      base + 10,       // Random number + pattern
      base + 15,       // Random number + pattern
    ];
    setNumbers(generatedNumbers);
    setCorrectAnswer1(base + 9);  // Dynamic correct answer
    setCorrectAnswer2(base + 13); // Dynamic correct answer
  }, []);

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
    setSubmitted(false);  // Reset submission state when input changes
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Calculate feedback for current input
    const feedback = calculateMissingNumbers(inputs, correctAnswer1, correctAnswer2);
    
    if (!feedback.correct1 || !feedback.correct2) {
      setLives(lives - 1);  // Reduce lives if the answer is wrong
    }

    setFeedback(feedback);
    setSubmitted(true);  // Indicate that the form was submitted

    // Show answers when lives run out
    if (lives - 1 <= 0) {
      setShowAnswers(true);
    }
  };

  const resetGame = () => {
    // Reset state to start the puzzle over
    setInputs({ missing1: "", missing2: "" });
    setFeedback({ correct1: false, correct2: false });
    setLives(5);  // Reset lives
    setShowAnswers(false);
    setSubmitted(false);  // Reset submission status
    window.location.reload();  // Reload to generate a new set of numbers
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">

      {/* Add the Instruction Component here */}
      <Instruction />

      {/* Display Lives */}
      <div className="flex space-x-2 mb-6">
        {Array(lives).fill().map((_, index) => (
          <span key={index} className="text-red-500 text-3xl">❤️</span>
        ))}
      </div>

      {/* Puzzle Layout */}
      <div className="relative mt-6">
        {/* Row 1 */}
        <div className="flex justify-center items-center mb-8">
          <div className="bg-blue-300 w-16 h-16 rounded-full flex items-center justify-center text-xl">{numbers[0]}</div>
        </div>

        {/* Row 2 */}
        <div className="flex justify-center items-center space-x-8 mb-8">
          <div className="bg-blue-300 w-16 h-16 rounded-full flex items-center justify-center text-xl">{numbers[1]}</div>
          <div className="bg-blue-300 w-16 h-16 rounded-full flex items-center justify-center text-xl">{numbers[2]}</div>
        </div>

        {/* Row 3 */}
        <div className="flex justify-center items-center space-x-8 mb-8">
          <div className="bg-blue-300 w-16 h-16 rounded-full flex items-center justify-center text-xl">{numbers[3]}</div>
          <div className="bg-blue-300 w-16 h-16 rounded-full flex items-center justify-center text-xl">{numbers[4]}</div>
          <div className="bg-blue-300 w-16 h-16 rounded-full flex items-center justify-center text-xl">{numbers[5]}</div>
        </div>

        {/* Row 4 */}
        <div className="flex justify-center items-center space-x-8 mb-8">
          <div className="bg-blue-300 w-16 h-16 rounded-full flex items-center justify-center text-xl">{numbers[6]}</div>
          {/* First missing number */}
          <div className="bg-blue-300 w-16 h-16 rounded-full flex items-center justify-center text-xl">
            {showAnswers ? (
              <span>{feedback.correctAnswer1}</span>  // Show the correct answer
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
          <div className="bg-blue-300 w-16 h-16 rounded-full flex items-center justify-center text-xl">36</div>
        </div>

        {/* Row 5 */}
        <div className="flex justify-center items-center space-x-8 mb-8">
          <div className="bg-blue-300 w-16 h-16 rounded-full flex items-center justify-center text-xl">28</div>
          {/* Second missing number */}
          <div className="bg-blue-300 w-16 h-16 rounded-full flex items-center justify-center text-xl">
            {showAnswers ? (
              <span>{feedback.correctAnswer2}</span>  // Show the correct answer
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
        </div>

        {/* Input Form */}
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

        {/* Reset button after showing answers */}
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

        {/* Feedback (only show after form has been submitted and if lives are left) */}
        {!showAnswers && submitted && lives > 0 && (
          <div className="mt-4 text-red-500">
            {feedback.correct1 && feedback.correct2 ? "Correct!" : "Try Again!"}
          </div>
        )}

        {/* Game Over Message */}
        {showAnswers && (
          <div className="mt-4 text-red-500">
            Game Over! The correct answers are {feedback.correctAnswer1} and {feedback.correctAnswer2}.
          </div>
        )}
      </div>
    </div>
  );
}

export default NumerologyTreePuzzle;
