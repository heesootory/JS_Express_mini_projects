const video = document.querySelector("video");
const videoController = document.getElementById("videoController");
const psBtn = videoController.querySelector("#playPauseBtn");
const volumeBtn = videoController.querySelector("#volume");
const volumeRange = videoController.querySelector("#volumeRange");
const currentTime = videoController.querySelector("#currentTime");
const totalTime = videoController.querySelector("#totalTime");
const timeline = videoController.querySelector("#timeline");
const fullscreenBtn = videoController.querySelector("#fullscreen");
const videoContainer = document.getElementById("videoContainer");

let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlayAndStop = () => {
  if (video.paused) {
    video.play();
    psBtn.className = "fas fa-pause";
  } else {
    video.pause();
    psBtn.className = "fas fa-play";
  }
};

const handleSound = () => {
  if (video.muted) {
    video.muted = false;
    volumeRange.value = volumeValue;
    volumeBtn.className = "fas fa-volume-up";
  } else {
    video.muted = true;
    volumeRange.value = 0;
    volumeBtn.className = "fas fa-volume-mute";
  }
};

const handleVolume = (event) => {
  const {
    target: { value }
  } = event;
  if (video.muted) {
    video.muted = false;
    volumeBtn.className = "fas fa-volume-mute";
  }
  if (value === "0") {
    volumeBtn.className = "fas fa-volume-off";
  } else {
    volumeBtn.className = "fas fa-volume-up";
  }
  video.volume = volumeValue = value;
};

const formatting = (s) => {
  return new Date(s * 1000).toISOString().substring(14, 19);
};

const handleLoadedMetadata = () => {
  totalTime.innerText = formatting(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
  currentTime.innerText = formatting(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};

const handleTimelineChange = (e) => {
  const {
    target: { value }
  } = e;
  video.currentTime = value;
};

const handlefullscreen = () => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    document.exitFullscreen();
    fullscreenBtn.innerText = "Full Screen";
  } else {
    videoContainer.requestFullscreen();
    fullscreenBtn.innerText = "smaller";
  }
};

const handleKeyBoard = (event) => {
  console.log(event);
  if(event.keyCode === 32){
    if (video.paused) {
      video.play();
      psBtn.className = "fas fa-pause";
    } else {
      video.pause();
      psBtn.className = "fas fa-play";
    }
  }
  else if(event.keyCode === 27){
    document.exitFullscreen();
    fullscreenBtn.innerText = "Full Screen";
  }
  else if(event.keyCode === 70){
    videoContainer.requestFullscreen();
    fullscreenBtn.innerText = "smaller";
  }
}

psBtn.addEventListener("click", handlePlayAndStop);
volumeBtn.addEventListener("click", handleSound);
volumeRange.addEventListener("input", handleVolume);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
timeline.addEventListener("input", handleTimelineChange);
fullscreenBtn.addEventListener("click", handlefullscreen);
document.addEventListener("keydown", handleKeyBoard);
