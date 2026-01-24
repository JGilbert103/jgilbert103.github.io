document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("overlay");
    const gif = document.querySelector(".monkeGif");
    const audio = document.getElementById("monkeAudio");
    const button = document.getElementById("randomMonkeLink");

    const monkeText = document.getElementById("monkeText");
    const videoLink = document.getElementById("videoLink");
    const shareBtn = document.getElementById("shareBtn");
    const pauseBtn = document.getElementById("pauseBtn");

    let monkes = [];
    let monkeBag = [];
    let lastMonke = null;

    let hasInteracted = false;
    let pendingMonke = null;
    let isPaused = false;


    fetch("data/monke.json")
        .then(r => r.json())
        .then(data => {
            monkes = data;
            preload(monkes);
            refillBag();

            const fromURL = getMonkeFromURL();
            if (fromURL) {
                monkeBag = monkeBag.filter(m => m.ID !== fromURL.ID);
                pendingMonke = fromURL;
                overlay.style.display = "flex";
                overlay.textContent = "You just got monke'd - Click to see yo monke";
            }
        });

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

        if (lastMonke && monkeBag[monkeBag.length - 1].ID === lastMonke.ID) {
            monkeBag = shuffle([...monkes]);
        }
    }

    function getNextMonke() {
        if (!monkeBag.length) refillBag();

        const monke = monkeBag.shift();

        if (lastMonke && monke.ID === lastMonke.ID) {
            monkeBag.push(monke);
            return getNextMonke();
        }

        lastMonke = monke;
        return monke;
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

    function playAudio(monke) {
        audio.pause();
        audio.src = monke.audio;
        audio.loop = true;
        audio.muted = true;
        isPaused = false;

        audio.load();

        audio.addEventListener(
            "canplay",
            () => {
                if (monke.start && audio.duration > monke.start) {
                    audio.currentTime = monke.start;
                }

                audio.muted = false;

                if (!isPaused) {
                    audio.play().catch(() => {});
                    pauseBtn.textContent = "||";
                }
            },
            { once: true }
        );
    }


    function updateMonkeUI(monke) {
        monkeText.textContent = monke.text;

        videoLink.textContent = `🎵 ${monke.title}`;
        videoLink.href = monke.link;

        const shareUrl = `${window.location.origin}/?monke=${monke.ID}`;

        shareBtn.onclick = () => {
            navigator.clipboard.writeText(shareUrl);
            shareBtn.textContent = "✅ Copied!";
            setTimeout(() => {
                shareBtn.textContent = "🔗 Share this monke";
            }, 1500);
        };
    }

    function showMonke(monke) {
        gif.src = monke.gif;
        gif.style.display = "block";
        overlay.style.display = "none";

        updateMonkeUI(monke);
        playAudio(monke);
        setURL(monke);
    }

    function trigger() {
        if (!monkes.length) return;

        hasInteracted = true;

        if (pendingMonke) {
            showMonke(pendingMonke);
            pendingMonke = null;
            return;
        }

        showMonke(getNextMonke());
    }

    pauseBtn.addEventListener("click", (e) => {
        e.stopPropagation();

        if (audio.paused) {
            isPaused = false;
            audio.play().catch(() => {});
            pauseBtn.textContent = "||";
        } else {
            isPaused = true;
            audio.pause();
            pauseBtn.textContent = "▶";
        }
    });


    overlay.addEventListener("click", trigger);
    button.addEventListener("click", trigger);
});
