 document.addEventListener("DOMContentLoaded", function() {

    const targetSong = "Hello";
    const submitButton = document.getElementById("submit-guess");
    const guessInput = document.getElementById("guess-input");
    const attemptsDiv = document.querySelector(".attempts");
    const attemptLimit = 8;
    const AlbumOrder = {
        "Cole World: The Sideline Story": 1,
        "Born Sinner": 2,
        "2014 Forest Hills Drive": 3,
        "4 Your Eyez Only": 4,
        "KOD": 5,
        "The Off-Season": 6
    };
    let numberOfAttempts = 0;
    var targetAlbum;
    var targetTrackNumber;
    var targetLength;
    var targetFeatures;

    submitButton.addEventListener("click", async function() {
        const guess = guessInput.value;
        
        const validInput = await checkInput(guess);
        if (!validInput) {
            alert("That is not a song. Try again");
            guessInput.value = '';                      // Clear the input for the next guess
            return;
        }

        numberOfAttempts++
        if (numberOfAttempts > attemptLimit){
            alert("you are out of guesses. Gameover")
            return;
        }

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
            if (AlbumOrder[targetAlbum] === AlbumOrder[data[0].album]){
                color = '#28812d'
            }
            if (Math.abs(AlbumOrder[targetAlbum] -  AlbumOrder[data[0].album]) < 3){    //THIS DOESN'T INDICATE IF YOU ARE ABOVE OR UNDER
                color = '#c39213'
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
            if (Math.abs(parseInt(targetTrackNumber, 10) - parseInt(data[0].tracknumber, 10)) < 3 ) {
                color = '#c39213'
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

            if (Math.abs(convertTimeStringToSeconds(targetLength) - convertTimeStringToSeconds(data[0].length)) < 31){
                color = '#c39213'
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

    function convertTimeStringToSeconds(timeString) {
        const parts = timeString.split(':');
        const minutes = parseInt(parts[0], 10);
        const seconds = parseInt(parts[1], 10);
        return (minutes * 60) + seconds;
    }

    async function displayAttempt(guess, guessRow){
        await displaySongName(guess, guessRow);
        await displaySongAlbum(guess, guessRow);
        await displaySongNumber(guess, guessRow);
        await displaySongLength(guess, guessRow);
        await displaySongFeature(guess, guessRow);
    }

    async function checkInput(input){
        let encodedInput = encodeURIComponent(input);
        let url = `http://localhost:3000/api/count?q=${encodedInput}`;

        try{
            const response = await fetch(url);
            const data = await response.json();

            console.log(data.count); // Assuming the server returns a JSON object with a 'count' property
            return data.count > 0; // Returns true if count is greater than 0, false otherwise
        } catch (error) {
            console.error('Error during search:', error);
            return false; // Return false in case of an error
        }

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