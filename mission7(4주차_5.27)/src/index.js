const video = document.querySelector("video");
const playBtn = document.getElementById("Play");
const muteBtn = document.getElementById("Mute");
const volumeRange = document.getElementById("Volumn");

let CurrentVolume = 0.5;
video.volume = CurrentVolume;

const handlePlay = (e) => {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
    playBtn.innerText = video.paused ? "Play!" : "Pause!";
};

const handleMute = (e) => {
    video.muted = video.muted ? false : true;
    muteBtn.innerText = video.muted ? "Unmute!" : "Mute!";
    volumeRange.value = video.muted ? 0 : CurrentVolume;
};

const handleVolumn = (event) => {
    const {
        target: { value }
    } = event;
    if (video.muted) {
        video.muted = false;
        muteBtn.innerText = "Mute";
    }
    CurrentVolume = value;
    video.volume = value;
};

playBtn.addEventListener("click", handlePlay);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumn);
