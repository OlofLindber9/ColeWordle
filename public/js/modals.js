document.addEventListener('initComplete', async function() {

    var victoryModalcloseButton = document.getElementsByClassName('close-button')[0];
    var loseModalcloseButton = document.getElementsByClassName('close-button')[1];
    var victoryModal = document.getElementById('victoryModal'); 
    var loseModal = document.getElementById('loseModal');
    var victoryModalContent = victoryModal.querySelector('.modal-content');
    var loseModalContent = loseModal.querySelector('.modal-content');
    var victoryModalImage = victoryModal.querySelector('.modal-image');
    var loseModalImage = loseModal.querySelector('.modal-image');
    var correctSong;
    var correctSongAlbumCover;
    var id = correctSongid;
    await getCorrectSong(id);
    await getCorrectSongAlbumCover(correctSong);

    if(correctSongAlbumCover === "Cole World: The Sideline Story") {
        correctSongAlbumCover = "Cole World The Sideline Story";
    }

    const winHeader = document.createElement('h1');
    winHeader.className = 'header';
    winHeader.textContent = `Correct! The song was ${correctSong}.`;
    victoryModalContent.appendChild(winHeader);
    victoryModalImage.src = `/resources/${correctSongAlbumCover}.jpg`;

    const loseHeader = document.createElement('h1');
    loseHeader.className = 'header';
    loseHeader.textContent = `Incorrect! The song was ${correctSong}.`;
    loseModalContent.appendChild(loseHeader);
    loseModalImage.src = `/resources/${correctSongAlbumCover}.jpg`;

    // When the user clicks on <span> (x), close the modal
    victoryModalcloseButton.onclick = function() {
        victoryModal.style.display = 'none';
    };
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target === victoryModal) {
            victoryModal.style.display = 'none';
        }
    };
    
    // When the user clicks on <span> (x), close the modal
    loseModalcloseButton.onclick = function() {
        loseModal.style.display = 'none';
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target === loseModal) {
            loseModal.style.display = 'none';
        }
    };

    async function getCorrectSong(id) {
        try {
            const response = await fetch(`http://localhost:3000/api/correctSong?id=${encodeURIComponent(id)}`);
            const song = await response.json();
            correctSong = song[0].song;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function getCorrectSongAlbumCover(correctSong) {
        try {
            const response = await fetch(`http://localhost:3000/api/album?name=${encodeURIComponent(correctSong)}`);
            const albumCover = await response.json();
            correctSongAlbumCover = albumCover[0].album;
        } catch (error) {
            console.error('Error:', error);
        }
    }

});