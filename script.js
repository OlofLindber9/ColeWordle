document.addEventListener("DOMContentLoaded", function() {
    const targetWord = "apple"; // For demonstration purposes, you can randomize this in a real game
    const submitButton = document.getElementById("submit-guess");
    const guessInput = document.getElementById("guess-input");
    const attemptsDiv = document.querySelector(".attempts");

    submitButton.addEventListener("click", function() {
        const guess = guessInput.value.toLowerCase();
        
        if (guess.length !== 5) {
            alert("Please enter a 5-letter word.");
            return;
        }

        const feedback = getFeedback(guess, targetWord);
        displayAttempt(guess, feedback);

        // Clear the input for the next guess
        guessInput.value = '';
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

    function displayAttempt(guess, feedback) {
        const attemptDiv = document.createElement('div');

        [...guess].forEach((letter, index) => {
            const letterSpan = document.createElement('span');
            letterSpan.textContent = letter;
            letterSpan.style.backgroundColor = feedback[index];
            attemptDiv.appendChild(letterSpan);
        });

        attemptsDiv.appendChild(attemptDiv);
    }
});
