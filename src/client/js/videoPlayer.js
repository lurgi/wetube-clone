const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const time = document.getElementById("time");
const volume = document.getElementById("volume");
const video = document.querySelector("video");

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

const handleMute = (e) => {
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

playBtn.addEventListener("click", handlePlayClick);
video.addEventListener("pause", handlePause);
video.addEventListener("play", handlePlay);
muteBtn.addEventListener("click", handleMute);
volume.addEventListener("input", handleVolumeChange); //change 속성은 마우스를 뗐을 때 작동. input은 실시간
