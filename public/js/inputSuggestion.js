document.addEventListener('DOMContentLoaded', (event) => {
    const input = document.getElementById('guess-input');
    const suggestionBox = document.getElementById('suggestion-box');
    input.parentNode.insertBefore(suggestionBox, input.nextSibling);


    input.addEventListener('input', function() {
        const partialName = input.value;
        if (partialName === '') {
            suggestionBox.innerHTML = '';
            suggestionBox.style.display = 'none';
            return;
        }
    
        let url = `http://localhost:3000/api/suggestions?partial=${encodeURIComponent(partialName)}`;
        fetch(url)
            .then(response => response.json())
            .then(suggestions => {
                if (suggestions.length > 0) {
                    suggestionBox.innerHTML = suggestions.map(name => `<div class="suggestion-item">${name}</div>`).join('');
                    suggestionBox.style.display = 'block';
    
                    // Add click event listeners to each suggestion item
                    document.querySelectorAll('.suggestion-item').forEach(item => {
                        item.addEventListener('click', function() {
                            input.value = this.textContent; // Set input value to the suggestion's text
                            suggestionBox.style.display = 'none'; // Hide the suggestion box
                        });
                    });
                    
                } else {
                    suggestionBox.innerHTML = '';
                    suggestionBox.style.display = 'none';
                }
            })
            .catch(error => console.error('Error:', error));
    });
    

        // Hide suggestion box when clicking outside
        document.addEventListener('click', function(e) {
            if (e.target.id !== 'guess-input' && e.target.id !== 'suggestion-box') {
                suggestionBox.style.display = 'none';
            }
        });
});