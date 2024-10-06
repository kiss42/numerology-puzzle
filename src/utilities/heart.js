// Function to generate hearts based on remaining lives
export const displayHearts = (lives) => {
    return Array(Math.max(lives, 0))  // Ensure no negative hearts are displayed
      .fill()
      .map((_, index) => (
        <span key={index} className="text-red-500 text-3xl">❤️</span>
      ));
  };
  
  // Function to reduce lives by 1 after an incorrect attempt
  export const reduceLives = (currentLives) => {
    return currentLives > 0 ? currentLives - 1 : 0;  // Ensure lives do not drop below 0
  };
  