document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("overlay");
    const gif = document.querySelector(".monkeGif");
    const audio = document.getElementById("monkeAudio");
    const button = document.getElementById("randomMonkeLink");

    let monkes = [];
    let monkeBag = [];

    /* ---------- Fetch + Init ---------- */

    fetch("data/monke.json")
        .then(r => r.json())
        .then(data => {
            monkes = data;
            preload(monkes);
            refillBag();

            const fromURL = getMonkeFromURL();
            if (fromURL) {
                monkeBag = monkeBag.filter(m => m.ID !== fromURL.ID);
                showMonke(fromURL);
            }
        });

    /* ---------- Helpers ---------- */

    function preload(data) {
        data.forEach(m => {
            new Image().src = m.gif;
            new Audio(m.audio);
        });
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function refillBag() {
        monkeBag = shuffle([...monkes]);
    }

    function getNextMonke() {
        if (!monkeBag.length) {
            refillBag();
        }
        return monkeBag.pop();
    }

    function setURL(monke) {
        const url = new URL(window.location);
        url.searchParams.set("monke", monke.ID);
        history.replaceState({}, "", url);
    }

    function getMonkeFromURL() {
        const params = new URLSearchParams(window.location.search);
        const id = Number(params.get("monke"));
        return monkes.find(m => m.ID === id) || null;
    }

    /* ---------- Playback ---------- */

    function playAudio(monke) {
        audio.pause();
        audio.src = monke.audio;
        audio.muted = true;
        audio.load();

        audio.addEventListener(
            "canplay",
            () => {
                if (monke.start && audio.duration > monke.start) {
                    audio.currentTime = monke.start;
                }
                audio.muted = false;
                audio.play().catch(() => {});
            },
            { once: true }
        );
    }

    function showMonke(monke) {
        gif.src = monke.gif;
        gif.style.display = "block";
        overlay.style.display = "none";
        playAudio(monke);
        setURL(monke);
    }

    /* ---------- Events ---------- */

    function trigger() {
        if (!monkes.length) return;
        showMonke(getNextMonke());
    }

    overlay.addEventListener("click", trigger);
    button.addEventListener("click", trigger);
});
