document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("overlay");
    const audio = document.getElementById("monkeAudio");
    const monkeGif = document.querySelector(".monkeGif");
    const randomMonkeLink = document.getElementById("randomMonkeLink");

    let monkes = [];
    let lastID = null;

    fetch("data/monke.json")
        .then(res => res.json())
        .then(data => {
            monkes = data.filter(m => m.gif && m.audio);
            preloadMonkes(monkes);
            loadFromURL();
        })
        .catch(err => console.error("Failed to load monkes:", err));


    function playAudio(monke) {
        audio.pause();
        audio.src = monke.audio;
        audio.load();

        audio.addEventListener("loadedmetadata", () => {
            audio.currentTime = monke.start || 0;
            audio.play().catch(() => {});
        }, { once: true });
    }

    function preloadMonkes(monkes) {
        monkes.forEach(m => {
            const img = new Image();
            img.src = m.gif;

            const a = new Audio();
            a.src = m.audio;
        });
    }

    function showMonke(monke) {
        monkeGif.src = monke.gif;
        monkeGif.style.display = "block";
        overlay.style.display = "none";

        playAudio(monke);

        lastID = monke.ID;
    }



    function getRandomMonke() {
        if (monkes.length === 1) return monkes[0];

        let monke;
        do {
            monke = monkes[Math.floor(Math.random() * monkes.length)];
        } while (monke.ID === lastID);

        return monke;
    }

    function setURL(id) {
        const url = new URL(window.location);
        url.searchParams.set("id", id);
        window.history.pushState({}, "", url);
    }

    function loadFromURL() {
        const params = new URLSearchParams(window.location.search);
        const id = parseInt(params.get("id"), 10);

        if (Number.isNaN(id)) return;

        const monke = monkes.find(m => m.ID === id);
        if (monke) showMonke(monke);
    }

    function triggerMonke() {
        if (!monkes.length) return;

        const monke = getRandomMonke();
        showMonke(monke);
        setURL(monke.ID);
    }

    randomMonkeLink.addEventListener("click", triggerMonke);
    overlay.addEventListener("click", triggerMonke);
});
