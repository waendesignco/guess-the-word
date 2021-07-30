//Create global variables to select the following elements
//1.The unordered list where the player’s guessed letters will appear.
const guessedLetter = document.querySelector (".guessed-letters");
//2.The button with the text “Guess!” in it.
const button = document.querySelector (".guess");
//3.The text input where the player will guess a letter.
const letterInput = document.querySelector (".letter");
//4.The empty paragraph where the word in progress will appear.
const wordInProgress = document.querySelector (".word-in-progress");
//5.The paragraph where the remaining guesses will display.
const remainingGuess = document.querySelector (".remaining");
//6.The span inside the paragraph where the remaining guesses will display.
const remainingGuessNum = document.querySelector (".remaining span");
//7.The empty paragraph where messages will appear when the player guesses a letter.
const message = document.querySelector (".message");
//8.The hidden button that will appear prompting the player to play again.
const playAgain = document.querySelector (".play-again");

const word = "Magnolia";  //temporary argument

//Write a Function to Add Placeholders for Each Letter
const placeholder = function(word) {
        const placeholderLetters = [];
        for (const letter of word) {
          console.log(letter);
          placeholderLetters.push("●");
        }
        wordInProgress.innerText = placeholderLetters.join(""); //join()method creates and returns a new string by concatinating all of the elements in an array
};

placeholder(word);

//Add an Event Listener for the Button
button.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = letterInput.value;
    console.log(guess);
    letterInput.value = "";   
});

//Create a Function to Check Player’s Input
const validateInput = function(input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input.length === 0) {
    message.innerText = "Please enter a letter." ;
  } else if (!input.match(acceptedLetter)) {  //! is a logical operator, mearning false.
    message.innerText = "Please enter a letter from A to Z.";
  } else {
    return input;
  }
};


//Validate Input in the Button Event Handler

//Add a New Global Variable for Player Guesses

//Create a Function to Capture Input

