const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volume = document.getElementById("volume");
const video = document.querySelector("video");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullscreenBtn = document.getElementById("fullscreen");
const videocontainer = document.getElementById("videocontainer");
const videoControls = document.getElementById("videoControls");

const handlePlayClick = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};

const handlePlay = () => (playBtn.innerText = "Pause");
const handlePause = () => (playBtn.innerText = "Play");
let valueValue = 0.5;

const handleMute = () => {
  if (video.muted) {
    (video.muted = false), (muteBtn.innerText = "Mute");
  } else {
    (video.muted = true), (muteBtn.innerText = "Unmute");
  }
  volume.value = video.muted ? "0" : valueValue;
};

const handleVolumeChange = (event) => {
  const { value } = event.target;
  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = "Mute";
  }
  if (value == 0) {
    video.muted = true;
    muteBtn.innerText = "Unmute";
  }
  valueValue = value;
  video.volume = valueValue;
};

const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substring(11, 19);

const handleLoadedMetadate = () => {
  totalTime.innerText = formatTime(video.duration);
  timeline.max = Math.floor(video.duration);
};
const handleTimeUpdate = () => {
  currentTime.innerText = formatTime(video.currentTime);
  timeline.value = Math.floor(video.currentTime);
};
const handleTimelineChange = (event) => {
  const {
    target: { value },
  } = event;
  video.currentTime = value;
};
const handleFullscreen = () => {
  const fullscreen = document.fullscreenElement; //fullscreen 요소를 알 수 있다.
  if (fullscreen) {
    document.exitFullscreen();
    fullscreenBtn.innerText = "Full Screen";
  } else {
    videocontainer.requestFullscreen();
    fullscreenBtn.innerText = "Exit Fullscreen";
  }
};

playBtn.addEventListener("click", handlePlayClick);
video.addEventListener("pause", handlePause);
video.addEventListener("play", handlePlay);
muteBtn.addEventListener("click", handleMute);
volume.addEventListener("input", handleVolumeChange); //change 속성은 마우스를 뗐을 때 작동. input은 실시간

video.addEventListener("loadedmetadata", handleLoadedMetadate);
video.addEventListener("timeupdate", handleTimeUpdate);
timeline.addEventListener("input", handleTimelineChange);
fullscreenBtn.addEventListener("click", handleFullscreen);

let controlsTimeout = null;
let controlsMovementTimeout = null;

const hideControls = () => videoControls.classList.remove("showing");

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout); // MouseMove가 실행하면 timeout을 없애주어야 한다.
    controlsTimeout = null;
  }
  videoControls.classList.add("showing");
  controlsMovementTimeout = setTimeout(hideControls, 2000);
};

const handleMouseLeave = () => {
  controlsTimeout = setTimeout(hideControls, 2000);
};

video.addEventListener("mousemove", handleMouseMove);
video.addEventListener("mouseleave", handleMouseLeave);
