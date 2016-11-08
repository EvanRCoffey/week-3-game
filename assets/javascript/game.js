//Holds the number of correctly guessed words
var wins = 0;
//Holds the number of remaining guesses for the current word
var guessesRemaining = 15;
//Holds the current word to be guessed
var wordToGuess;
//Holds the current guessed letter
var currentGuess;
//Flag for first key press
var noKeyPressedYet = true;
//Holds the number of the word being guessed
var wordNum = 0;
//Holds the music to be played
var audio;
//Holds "game over" flag
var gameOver = false;


//Holds all the words to be guessed
var wordBank = ["beethoven", "tchaikovsky", "stravinsky", "vivaldi", "debussy"];
//Holds all the guessed letters for the current word
var guessedLetters = [];
//Holds letters and dashes to be displayed on the page
var lettersAndDashes = [];

function reset() {
	//Empty the guessedLetters array and display the change
	guessedLetters = [];
	document.getElementById("guessedLettersArea").innerHTML = "Guessed letters for the current word: " + guessedLetters.join(" ");
	//Reset the number of guesses remaining and display the change
	guessesRemaining = 15;
	document.getElementById("guessesRemainingArea").innerHTML = "Guesses remaining for the current word: " + guessesRemaining;
	//Load the word to be guessed from wordBank array
	if (wordNum < 5) wordToGuess = wordBank[wordNum];
	//Reset to display all dashes
	lettersAndDashes = [];
	for (var i = 0; i < wordToGuess.length; i++) {
		lettersAndDashes.push('-')
	}
	document.getElementById("currentWordArea").innerHTML = lettersAndDashes.join(" ");
	//Resets message area
	document.getElementById("messageArea").innerHTML = "";
};

function playMusic (x) {
	if (x === 1) {
		audio = new Audio('assets/mp3/b.mp3');
		audio.play();
		document.getElementById("composersArea").innerHTML = 'Ludwig von Beethoven <br><br> "Fifth Symphony, mvmt 1"';
	}
	if (x === 2) {
		audio.load();
		audio = new Audio('assets/mp3/t.mp3');
		audio.play();
		document.getElementById("composersArea").innerHTML = 'Pyotr Ilich Tchaikovsky <br><br> "Dance of the Sugar Plum Fairy, from The Nutcracker"';
	}
	if (x === 3) {
		audio.load();
		audio = new Audio('assets/mp3/s.mp3');
		audio.play();
		document.getElementById("composersArea").innerHTML = 'Igor Stravinsky <br><br> "Le Sacre du Printemps (The Rite of Spring)"';
	}
	if (x === 4) {
		audio.load();
		audio = new Audio('assets/mp3/v.mp3');
		audio.play();
		document.getElementById("composersArea").innerHTML = 'Antonio Vivaldi <br><br> "Spring, from The Four Seasons"';
	}
	if (x === 5) {
		audio.load();
		audio = new Audio('assets/mp3/d.mp3');
		audio.play();
		document.getElementById("composersArea").innerHTML = 'Claude Debussy <br><br> "Clair de Lune, from Suite Bergamasque"';
	}
};

//When a user presses a button...
document.onkeyup = function(event) {
	//Game over?  If not, do things.
	if (gameOver === false) {
		//First keypress loads the first word and begins the game
		if (noKeyPressedYet) {
			//Reset everything and start next word
			reset();
			//Increments wordNum to go to next word
			wordNum++;
			//Every subsequent keypress will operate normally
			noKeyPressedYet = false;
			//Display "Wins: 0"
			document.getElementById("winsArea").innerHTML = "Wins: 0";
		}
		//Every keypress after the first...
		else {
			//Store the letter that was pressed in "currentGuess"
			currentGuess = String.fromCharCode(event.keyCode).toLowerCase();
			//If the letter hasn't been guessed...
			if (guessedLetters.indexOf(currentGuess) === -1) {
				//Add the letter to guessedLetters[] and display the change
				guessedLetters.push(currentGuess)
				document.getElementById("guessedLettersArea").innerHTML = "Guessed letters for the current word: " + guessedLetters.join(" ");
				//Decrement guessesRemaining and display the change
				guessesRemaining--;
				document.getElementById("guessesRemainingArea").innerHTML = "Guesses remaining for the current word: " + guessesRemaining;
				//If the letter is in the word...
				if (wordToGuess.indexOf(currentGuess) >= 0) {
					//Replace the appropriate dashes with that letter and displays the changes
					for (var i = 0; i < wordToGuess.length; i++) {
						if (wordToGuess[i] === currentGuess) {
							lettersAndDashes[i] = currentGuess;
							document.getElementById("currentWordArea").innerHTML = lettersAndDashes.join(" ");
						}
					}
					//If all the letters in the word have been guessed
					if (lettersAndDashes.indexOf('-') === -1)
					{	
						//Play some music!
						playMusic(wordNum);
						//Increment wins
						wins++;
						document.getElementById("winsArea").innerHTML = "Wins: " + wins;
						//Reset everything and start next word
						reset();
						//Increments wordNum to go to next word
						wordNum++;
						//End game if it's time to do so
						if (wordNum === 6) {
							gameOver = true;
							document.getElementById("messageArea").innerHTML = "Game over!  Enjoy the music :)";
							document.getElementById("guessedLettersArea").innerHTML = "";
							document.getElementById("guessesRemainingArea").innerHTML = "";
							document.getElementById("currentWordArea").innerHTML = "";
						}
					}	
				}
				//If the letter isn't in the word...
				else {
					//If the user is out of guesses...
					if (guessesRemaining === 0) {
						//Play some music!
						playMusic(wordNum);
						//Reset everything and start next word
						reset();
						//Increments wordNum to go to next word
						wordNum++;
						//End game if it's time to do so
						if (wordNum === 6) {
							gameOver = true;
							document.getElementById("messageArea").innerHTML = "Game over!  Enjoy the music :)";
							document.getElementById("guessedLettersArea").innerHTML = "";
							document.getElementById("guessesRemainingArea").innerHTML = "";
							document.getElementById("currentWordArea").innerHTML = "";
						}
					}
					//Inform the user
					document.getElementById("messageArea").innerHTML = currentGuess.toUpperCase() + " is not in the word!";
				}
			}
			//If the letter has been guessed...
			else {
				//Inform the user
				document.getElementById("messageArea").innerHTML = currentGuess.toUpperCase() + " has already been guessed!";
			}
		}
	}	
}

