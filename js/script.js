document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("overlay");
    const gif = document.querySelector(".monkeGif");
    const audio = document.getElementById("monkeAudio");
    const button = document.getElementById("randomMonkeLink");

    let monkes = [];
    let lastID = null;

    fetch("data/monke.json")
        .then(r => r.json())
        .then(data => {
            monkes = data;
            preload(monkes);
        });

    function preload(data) {
        data.forEach(m => {
            new Image().src = m.gif;
            new Audio(m.audio);
        });
    }

    function getRandom() {
        let m;
        do {
            m = monkes[Math.floor(Math.random() * monkes.length)];
        } while (m.ID === lastID && monkes.length > 1);
        return m;
    }

    function playAudio(monke) {
        audio.pause();
        audio.src = monke.audio;
        audio.muted = true;
        audio.load();

        audio.addEventListener("canplay", () => {
            if (monke.start && audio.duration > monke.start) {
                audio.currentTime = monke.start;
            }
            audio.muted = false;
            audio.play().catch(() => {});
        }, { once: true });
    }

    function showMonke(monke) {
        gif.src = monke.gif;
        gif.style.display = "block";
        overlay.style.display = "none";
        playAudio(monke);
        lastID = monke.ID;
    }

    function trigger() {
        if (!monkes.length) return;
        showMonke(getRandom());
    }

    overlay.addEventListener("click", trigger);
    button.addEventListener("click", trigger);
});
