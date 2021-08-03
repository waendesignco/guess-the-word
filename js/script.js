//Create global variables to select the following elements
//1.The unordered list where the player’s guessed letters will appear.
const guessedLettersEle = document.querySelector (".guessed-letters");
//2.The button with the text “Guess!” in it.
const button = document.querySelector (".guess");
//3.The text input where the player will guess a letter.
const letterInput = document.querySelector (".letter");
//4.The empty paragraph where the word in progress will appear.
const wordInProgress = document.querySelector (".word-in-progress");
//5.The paragraph where the remaining guesses will display.
const remainingGuessEle = document.querySelector (".remaining");
//6.The span inside the paragraph where the remaining guesses will display.
const remainingGuessSpan = document.querySelector (".remaining span");
//7.The empty paragraph where messages will appear when the player guesses a letter.
const message = document.querySelector (".message");
//8.The hidden button that will appear prompting the player to play again.
const playAgain = document.querySelector (".play-again");

let word = "Magnolia";  //temporary argument
let guessedLetters = [];   //Add a New Global Variable for Player Guesses
let remainingGuesses = 8;   //Declare a Global Variable for the Number of Guesses

//Add an Async function
const getWord = async function() {
  const res = await fetch (
    "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
  );
  const words = await res.text();
  //console.log(data);
  const wordArray = words.split("\n");
  const randomIndex = Math.floor(Math.random() *wordArray.length);
  word = wordArray[randomIndex].trim();
  console.log(word);
  placeholder(word);
};

getWord();  //Call the function

//Write a Function to Add Placeholders for Each Letter
const placeholder = function (word) {
        const placeholderLetters = [];
        for (const letter of word) {
          //console.log(letter);
          placeholderLetters.push("●");
        }
        wordInProgress.innerText = placeholderLetters.join(""); //join()method creates and returns a new string by concatinating all of the elements in an array
};

//Add an Event Listener for the Button
button.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText ="";  //empty message paragraph
    const guess = letterInput.value;  //grad what was entered in the input
    const goodGuess = validateInput(guess);  //call the validated function below

    if (goodGuess) {
      makeGuess(guess);    
    }
    //console.log(guess);
    letterInput.value = "";   
});

//Create a Function to Check Player’s Input
const validateInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input.length === 0) {
    message.innerText = "Please enter a letter." ;
  } else if (!input.match(acceptedLetter)) {  //! is a logical operator, mearning false.
    message.innerText = "Please enter a letter from A to Z.";
  } else {
    return input;
  }
};

//Create a Function to Capture Input
const makeGuess = function (guess) {
  guess = guess.toUpperCase();
  if (guessedLetters.includes(guess)) {
    message.innerText = "You already guessed that letter. Try again.";
   } else {
      guessedLetters.push(guess);
      console.log(guessedLetters);
      updateGuessesRemaining(guess);
      displayLetters();
      updateWordInProgress(guessedLetters);   
    }
};

//Create a Function to Show the Guessed Letters
const displayLetters = function () {
  guessedLettersEle.innerHTML ="";  //empty letters already entered
  for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersEle.append(li);
  }
};

//Create a Function to Update the Word in Progress
const updateWordInProgress = function (gueseedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const revealWord = [];
  for (const letter of wordArray) {
   if (guessedLetters.includes(letter)) {
     revealWord.push(letter.toUpperCase());
     } else {
     revealWord.push("●")
  }
  //console.log(revealWord);
  wordInProgress.innerText = revealWord.join("");
  checkIfWin();
  }
};

//Create a Function to Count Guesses Remaining
const updateGuessesRemaining = function (guess) {
  const upperWord = word.toUpperCase();  
  if (!upperWord.includes(guess)) {    //! means NO
    message.innerText = `The word has no ${guess}.`;
    remainingGuesses -= 1;
  } else {
    message.innerText = `Bingo! The word has the letter ${guess}.`;
  }

  if (remainingGuesses === 0) {
    message.innerHTML = `The game is over. The answer is <span class="highlight">${word}<span>.`;
  } else if (remainingGuesses === 1) {
    remainingGuessSpan.innerText = `${remainingGuesses} guess`;
  } else {
    remainingGuessSpan.innerText = `${remainingGuesses} guesses`;
  }
};

//Create a Function to Check If the Player Won
const checkIfWin = function () {
  if (word.toUpperCase() === wordInProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;

    startOver();
  }
};

//Create a Function to Hide and Show Elements
const startOver = function () {
   button.classList.add("hide");
   remainingGuessEle.classList.add("hide");
   guessedLettersEle.classList.add("hide");
   playAgain.classList.remove("hide");
};

//Add a Click Event to the Play Again Button - reset all original values and grab new word
playAgain.addEventListener("click", function () {
     message.classList.remove("win");
     guessedLetters = []; 
     remainingGuesses = 8;
     remainingGuessSpan.innerText = `${remainingGuesses} guesses`;
     guessedLettersEle.innerHTML ="";
     message.innerText = "";

     getWord(); 

     remainingGuessEle.classList.remove("hide");
     guessedLettersEle.classList.remove("hide");
     
     //show the right UI elements
     button.classList.remove("hide");
     playAgain.classList.add("hide");
     remainingGuessEle.classList.remove("hide");
     guessedLettersEle.classList.remove("hide");       
  });
