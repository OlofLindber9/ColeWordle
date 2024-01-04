 document.addEventListener("DOMContentLoaded", function() {

    const targetSong = "Hello";
    const submitButton = document.getElementById("submit-guess");
    const guessInput = document.getElementById("guess-input");
    const attemptsDiv = document.querySelector(".attempts");
    const attemptLimit = 8;
    let numberOfAttempts = 0;
    var targetAlbum;
    var targetTrackNumber;
    var targetLength;
    var targetFeatures;

    submitButton.addEventListener("click", function() {
        const guess = guessInput.value;
        
        numberOfAttempts++
        if (numberOfAttempts > attemptLimit){
            alert("you are out of guesses. Gameover")
            return;
        }

        const feedback = getFeedback(guess, targetSong);
        //displayAttempt(guess, feedback);
        const guessRow = document.createElement('li');  
        guessRow.className = "list-group-item"; 
        displayAttempt(guess, guessRow);        
        
        // Clear the input for the next guess
        guessInput.value = '';
      
        // Check if victory
/*         let victory = true;
        for (color in feedback) {
            if (feedback[color] !== "green") {
                victory = false;
                break; // Exit the loop as victory is not possible with a non-green color
            }
        }
        
        if (victory) {
            alert("You have won the game");
        } */
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

    function displaySongName(guess, guessRow){
        console.log("Attempting to display...");

        var info;
        let encodedSongName = encodeURIComponent(guess);
        let url = `http://localhost:3000/api/name?name=${encodedSongName}`
        var color;

        fetch(url)
        .then(response => response.json())
        .then(data => {
            info = data;
            color = '#090401';
            const letterBadge = document.createElement('span');
            letterBadge.className = `badge badge-pill mr-2 mb-2 badge`;
            letterBadge.textContent = info[0].name;
            if (info[0].name === targetSong){
                color = '#28812d'
            }
            letterBadge.style.backgroundColor = color;
            guessRow.appendChild(letterBadge);
            console.log("Display complete.");
            console.log(info)
    
            attemptsDiv.appendChild(guessRow);              //THIS IS ONLY DONE ONES
        })
        .catch(error => console.error('Error fetching data:', error));
    }

    function displaySongAlbum(guess, guessRow){
        console.log("Attempting to display...");

        var info;
        let encodedSongName = encodeURIComponent(guess);
        let url = `http://localhost:3000/api/album?name=${encodedSongName}`

        let encodedTargetSongName = encodeURIComponent(targetSong);
        let url2 = `http://localhost:3000/api/album?name=${encodedTargetSongName}`

        var color;
        const letterBadge = document.createElement('span');

        fetch(url)
        .then(response => response.json())
        .then(data => {
            info = data;
            letterBadge.className = `badge badge-pill mr-2 mb-2 badge`;
            letterBadge.textContent = info[0].album;
            targetAlbum = info[0].album;
            console.log(info)
            return fetch(url2);
        })
        .then(response => response.json())
        .then(data => {
            color = '#090401';
            if (targetAlbum === data[0].album){
                color = '#28812d'
            }
            letterBadge.style.backgroundColor = color;
            guessRow.appendChild(letterBadge);
            console.log("Display complete.");
        })
        .catch(error => console.error('Error fetching data:', error));
        
    }

    function displaySongNumber(guess, guessRow){
        console.log("Attempting to display...");

        var info;
        let encodedSongName = encodeURIComponent(guess);
        let url = `http://localhost:3000/api/tracknumber?name=${encodedSongName}`

        let encodedTargetSongName = encodeURIComponent(targetSong);
        let url2 = `http://localhost:3000/api/tracknumber?name=${encodedTargetSongName}`

        var color;
        const letterBadge = document.createElement('span');

        fetch(url)
        .then(response => response.json())
        .then(data => {
            info = data;
            letterBadge.className = `badge badge-pill mr-2 mb-2 badge`;
            letterBadge.textContent = info[0].tracknumber;
            targetTrackNumber = info[0].tracknumber;
            console.log(info)
            return fetch(url2);
        })
        .then(response => response.json())
        .then(data => {
            color = '#090401';
            if (targetTrackNumber === data[0].tracknumber){
                color = '#28812d'
            }
            letterBadge.style.backgroundColor = color;
            guessRow.appendChild(letterBadge);
            console.log("Display complete.");
        })
        .catch(error => console.error('Error fetching data:', error));
    }

    function displaySongLength(guess, guessRow){
        console.log("Attempting to display...");

        var info;
        let encodedSongName = encodeURIComponent(guess);
        let url = `http://localhost:3000/api/length?name=${encodedSongName}`

        let encodedTargetSongName = encodeURIComponent(targetSong);
        let url2 = `http://localhost:3000/api/length?name=${encodedTargetSongName}`

        var color;
        const letterBadge = document.createElement('span');

        fetch(url)
        .then(response => response.json())
        .then(data => {
            info = data;
            letterBadge.className = `badge badge-pill mr-2 mb-2 badge`;
            letterBadge.textContent = info[0].length;
            targetLength = info[0].length;
            console.log(info)
            return fetch(url2);
        })
        .then(response => response.json())
        .then(data => {
            color = '#090401';
            if (targetLength === data[0].length){
                color = '#28812d'
            }
            letterBadge.style.backgroundColor = color;
            guessRow.appendChild(letterBadge);
            console.log("Display complete.");
        })
        .catch(error => console.error('Error fetching data:', error));
    }

    function displaySongFeature(guess, guessRow){
        console.log("Attempting to display...");

        var info;
        let encodedSongName = encodeURIComponent(guess);
        let url = `http://localhost:3000/api/features?name=${encodedSongName}`

        let encodedTargetSongName = encodeURIComponent(targetSong);
        let url2 = `http://localhost:3000/api/features?name=${encodedTargetSongName}`

        var color;
        const letterBadge = document.createElement('span');

        fetch(url)
        .then(response => response.json())
        .then(data => {
            info = data;
            letterBadge.className = `badge badge-pill mr-2 mb-2 badge`;
            letterBadge.textContent = info[0].features;
            targetFeatures = info[0].features;
            console.log(info)
            return fetch(url2);
        })
        .then(response => response.json())
        .then(data => {
            color = '#090401';
            if (targetFeatures === data[0].features){
                color = '#28812d'
            }
            letterBadge.style.backgroundColor = color;
            guessRow.appendChild(letterBadge);
            console.log("Display complete.");
        })
        .catch(error => console.error('Error fetching data:', error));
        
    }

    async function displayAttempt(guess, guessRow){
        await displaySongName(guess, guessRow);
        await displaySongAlbum(guess, guessRow);
        await displaySongNumber(guess, guessRow);
        await displaySongLength(guess, guessRow);
        await displaySongFeature(guess, guessRow);
    }
});








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





 /*
    function displayAttempt(guess, feedback) {
        const guessRow = document.createElement('li');
        guessRow.className = "list-group-item";
        console.log("Attempting to display...");
        [...guess].forEach((letter, index) => {
            const letterBadge = document.createElement('span');
            letterBadge.className = `badge badge-pill mr-2 mb-2 badge-${feedback[index]}`;
            //letterBadge.className = `badge bg-${feedback[index]}`;
            letterBadge.textContent = letter;
            letterBadge.style.backgroundColor = feedback[index];
            guessRow.appendChild(letterBadge);
        });
        console.log("Display complete.");
        attemptsDiv.appendChild(guessRow);

        fetch('http://localhost:3000/api/songs')
            .then(response => response.json())
            .then(data => {
                console.log(data); // Do something with the data
            })
            .catch(error => console.error('Error fetching data:', error));
    }*/