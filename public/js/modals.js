document.addEventListener("DOMContentLoaded", async function() {

    var closeButton = document.getElementsByClassName('close-button')[0];
    var modal = document.getElementById('victoryModal'); 
    var modalContent = modal.querySelector('.modal-content'); // Select the modal-content element
    var correctSong;
    var id = 1;

    const header = document.createElement('h1');

    await getCorrectSong(id);

    header.className = 'header';
    header.textContent = `Correct! The song was ${correctSong}.`;
    modalContent.appendChild(header); // Append the header to the modal-content

    // When the user clicks on <span> (x), close the modal
    closeButton.onclick = function() {
        modal.style.display = 'none';
    };
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    async function getCorrectSong(id) {
        try {
            const response = await fetch(`http://localhost:3000/api/correctSong?id=${encodeURIComponent(id)}`);
            const song = await response.json();
            correctSong = song[0].name;
            header.textContent = `Correct! The song was ${correctSong}.`; // Update the textContent with the correct song name
        } catch (error) {
            console.error('Error:', error);
        }
    }

});



/*
document.addEventListener("DOMContentLoaded", async function() {


    var closeButton = document.getElementsByClassName('close-button')[0];
    var modal = document.getElementById('victoryModal'); 
    var correctSong;
    id = 1;

    await getCorrectSong(id);

    const header = document.createElement('div');
    header.className = 'header';
    header.textContent = `Correct! The song was ${correctSong}.`;
    modal.appendChild(header);

    // When the user clicks on <span> (x), close the modal
    closeButton.onclick = function() {
    modal.style.display = 'none';
    }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
        }
    }

    function getCorrectSong(id) {

        fetch(`http://localhost:3000/api/correctSong?id=${encodeURIComponent(id)}`)
        .then(response => response.json())
        .then(song => {
            correctSong = song[0].name;
        })
        .catch(error => console.error('Error:', error));
    }

});
*/