
// =====================================
// OPEN INVITATION BUTTON
// =====================================

const openButton = document.getElementById("openInvitation");

const coverPage = document.getElementById("coverPage");

const invitationPage = document.getElementById("invitationPage");

const backgroundMusic = document.getElementById("backgroundMusic");

const youtubeVideoId = "ORZH8Urlk3Y";
let musicPlayer;
let musicPlayerReady = false;
let musicStartPending = false;
let musicPlaybackRequested = true;

function startBackgroundMusic() {
    musicPlaybackRequested = true;

    if (!musicPlayerReady || musicStartPending) {
        return;
    }

    if (musicPlayer.getPlayerState() === YT.PlayerState.PLAYING) {
        return;
    }

    musicStartPending = true;
    musicPlayer.seekTo(0, true);
    musicPlayer.playVideo();
    window.setTimeout(() => {
        musicStartPending = false;
    }, 1500);
}

window.onYouTubeIframeAPIReady = () => {
    const playerVars = {
        autoplay: 1,
        controls: 0,
        disablekb: 1,
        fs: 0,
        loop: 1,
        playlist: youtubeVideoId,
        playsinline: 1,
        rel: 0
    };

    if (window.location.protocol === "http:" || window.location.protocol === "https:") {
        playerVars.origin = window.location.origin;
    }

    musicPlayer = new YT.Player(backgroundMusic, {
        width: "200",
        height: "200",
        videoId: youtubeVideoId,
        playerVars,
        events: {
            onReady: () => {
                musicPlayerReady = true;
                if (musicPlaybackRequested) {
                    startBackgroundMusic();
                }
            },
            onStateChange: (event) => {
                if (event.data === YT.PlayerState.PLAYING) {
                    musicStartPending = false;
                } else if (event.data === YT.PlayerState.ENDED) {
                    musicPlayer.seekTo(0, true);
                    musicPlayer.playVideo();
                }
            }
        }
    });
};

const youtubeApi = document.createElement("script");
youtubeApi.src = "https://www.youtube.com/iframe_api";
youtubeApi.async = true;
document.head.appendChild(youtubeApi);

coverPage.addEventListener("pointerdown", startBackgroundMusic);

document.addEventListener("visibilitychange", () => {
    if (
        document.visibilityState === "visible" &&
        musicPlayerReady &&
        musicPlayer.getPlayerState() !== YT.PlayerState.PLAYING
    ) {
        if (musicPlayer.getPlayerState() === YT.PlayerState.ENDED) {
            musicPlayer.seekTo(0, true);
        }
        musicPlayer.playVideo();
    }
});

openButton.addEventListener("click", () => {

    startBackgroundMusic();

    // Hide first page
    coverPage.hidden = true;

    // Show second page
    invitationPage.hidden = false;
    invitationPage.classList.add("is-open");

    // Start from top of invitation
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// =====================================
// WEDDING COUNTDOWN
// =====================================

// 24 December 2026, 6:30 PM IST

const weddingDate = new Date(
    "2026-12-24T18:30:00+05:30"
).getTime();


function updateCountdown() {

    const now = Date.now();

    const distance = weddingDate - now;

    const daysEl = document.getElementById("days");

    const hoursEl = document.getElementById("hours");

    const minutesEl = document.getElementById("minutes");

    const secondsEl = document.getElementById("seconds");

    const messageEl = document.getElementById("countdownMessage");


    // If wedding date has arrived

    if (distance <= 0) {

        daysEl.textContent = "00";

        hoursEl.textContent = "00";

        minutesEl.textContent = "00";

        secondsEl.textContent = "00";

        messageEl.textContent =
            "Today is the beautiful day. Alhamdulillah!";

        return;

    }


    // Calculate remaining time

    const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (distance / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (distance / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (distance / 1000) % 60
    );


    // Display countdown

    daysEl.textContent =
        String(days).padStart(2, "0");

    hoursEl.textContent =
        String(hours).padStart(2, "0");

    minutesEl.textContent =
        String(minutes).padStart(2, "0");

    secondsEl.textContent =
        String(seconds).padStart(2, "0");

}


// Start countdown

updateCountdown();


// Update every second

setInterval(updateCountdown, 1000);
