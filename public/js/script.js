 document.addEventListener("DOMContentLoaded", function() {
    const targetWord = "apple"; // For demonstration purposes, you can randomize this in a real game
    const submitButton = document.getElementById("submit-guess");
    const guessInput = document.getElementById("guess-input");
    const attemptsDiv = document.querySelector(".attempts");
    const attemptLimit = 8;
    let numberOfAttempts = 0;

    submitButton.addEventListener("click", function() {
        const guess = guessInput.value.toLowerCase();
        
        numberOfAttempts++
        if (numberOfAttempts > attemptLimit){
            alert("you are out of guesses. Gameover")
            return;
        }

        if (guess.length !== 5) {
            alert("Please enter a 5-letter word.");
            return;
        }

        const feedback = getFeedback(guess, targetWord);
        displayAttempt(guess, feedback);
        
        // Clear the input for the next guess
        guessInput.value = '';
      
        // Check if victory
        let victory = true;
        for (color in feedback) {
            if (feedback[color] !== "green") {
                victory = false;
                break; // Exit the loop as victory is not possible with a non-green color
            }
        }
        
        if (victory) {
            alert("You have won the game");
        }
    });

    function getFeedback(guess, target) {
        return [...guess].map((letter, index) => {
            if (letter === target[index]) {
                return 'green';
            } else if (target.includes(letter)) {
                return 'yellow';
            } else {
                return 'gray';
            }
        });
    }

    /*
    function displayAttempt(guess, feedback) {
        const attemptDiv = document.createElement('div');

        [...guess].forEach((letter, index) => {
            const letterSpan = document.createElement('span');
            letterSpan.textContent = letter;
            letterSpan.style.backgroundColor = feedback[index];
            attemptDiv.appendChild(letterSpan);
        });

        attemptsDiv.appendChild(attemptDiv);
    } */

    function displayAttempt(guess, feedback) {
        const guessRow = document.createElement('li');
        guessRow.className = "list-group-item";
        console.log("Attempting to display...");
        [...guess].forEach((letter, index) => {
            const letterBadge = document.createElement('span');
            letterBadge.className = `badge badge-pill mr-2 mb-2 badge-${feedback[index]}`;
            //letterBadge.className = `badge bg-${feedback[index]}`;
            letterBadge.textContent = "letter";
            letterBadge.style.backgroundColor = feedback[index];
            guessRow.appendChild(letterBadge);
        });
        console.log("Display complete.");
        attemptsDiv.appendChild(guessRow);
    }

});

/*
document.addEventListener("DOMContentLoaded", function() {
    const targetWord = "apple"; // For demonstration purposes, you can randomize this in a real game
    const submitButton = document.getElementById("submit-guess");
    const guessInput = document.getElementById("guess-input");
    //const pastGuesses = document.getElementById("pastGuesses");
    const pastGuesses = document.querySelector('.list-group');
    const attemptLimit = 8;
    let numberOfAttempts = 0;

    submitButton.addEventListener("click", function() {
        const guess = guessInput.value.toLowerCase();
        //console.log("guess:", guess)
        
        numberOfAttempts++;
        if (numberOfAttempts > attemptLimit) {
            alert("You are out of guesses. Game over!");
            return;
        }

        if (guess.length !== 5) {
            alert("Please enter a 5-letter word.");
            return;
        }

        const feedback = getFeedback(guess, targetWord);
        //console.log("feedback", feedback);
        displayAttempt(guess, feedback);
        
        // Clear the input for the next guess
        guessInput.value = '';

        // Check if victory
        if (feedback.every(color => color === "green")) {
            alert("You have won the game!");
        }
    });

    function getFeedback(guess, target) {
        return [...guess].map((letter, index) => {
            if (letter === target[index]) {
                return 'success'; // green
            } else if (target.includes(letter)) {
                return 'warning'; //yellow
            } else {
                return 'secondary'; //gray
            }
        });
    }

    function displayAttempt(guess, feedback) {
        const guessRow = document.createElement('li');
        guessRow.className = "list-group-item";
        console.log("Attempting to display...");
        [...guess].forEach((letter, index) => {
            const letterBadge = document.createElement('span');
            //letterBadge.className = `badge badge-pill mr-2 mb-2 badge-${feedback[index]}`;
            letterBadge.className = `badge bg-${feedback[index]}`;
            letterBadge.textContent = letter;
            guessRow.appendChild(letterBadge);
        });
        console.log("Display complete.");
        pastGuesses.appendChild(guessRow);
    }
});
 */