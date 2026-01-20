document.addEventListener('DOMContentLoaded', () => {
    // Monke Overlay and Audio Logic
    const overlay = document.getElementById('overlay');
    const audio = document.getElementById('monkeAudio');
    const monkeGif = document.querySelector('.monkeGif');

    if (overlay && audio && monkeGif) {
        overlay.addEventListener('click', () => {
            audio.play();
            overlay.style.display = 'none';
            monkeGif.style.display = 'block';
        });
    }

    // Random Page Link Logic
    const randomMonkeLink = document.getElementById('randomMonkeLink');
    
    if (randomMonkeLink) {
        randomMonkeLink.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent the default action of the link

            // Set the number of available pages
            const totalPages = 4; // Change this number if you add more pages
            let randomPageNumber;

            // Retrieve the previously visited page from localStorage
            const previousPage = localStorage.getItem('previousPage');

            // Loop until a different page number is generated
            do {
                randomPageNumber = Math.floor(Math.random() * totalPages) + 1;
            } while (`monke${randomPageNumber}.html` === previousPage);

            // Construct the random page URL
            const randomPage = `monke${randomPageNumber}.html`;

            // Store this page in localStorage
            localStorage.setItem('previousPage', randomPage);

            // Redirect to the random page
            window.location.href = randomPage;
        });
    }
});
