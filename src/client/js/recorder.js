import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
  video.srcObject = stream;
  video.play();
};
init();

const handleStart = () => {
  startBtn.innerText = "Stop Recording";
  startBtn.removeEventListener("click", handleStart);
  startBtn.addEventListener("click", handleStop);

  recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
  recorder.ondataavailable = (event) => {
    videoFile = URL.createObjectURL(event.data);
    video.srcObject = null;
    video.src = videoFile;
    video.loop = true;
    video.play();
  };
  recorder.start();
};

const handleDownload = async () => {
  const ffmpeg = createFFmpeg({ log: true });
  await ffmpeg.load();

  ffmpeg.FS("writeFile", "recording.webm", await fetchFile(videoFile));
  //(ffmpeg의 가상의 컴퓨터에 파일을 생성, webm으로 생성, URL에서 파일을 가져온다)
  await ffmpeg.run("-i", " recording.webm", "-r", "60", "output.mp4");
  //(input,가상의 컴퓨터에 존재하는 파일, 초당 60프레임으로 인코딩,mp4파일로 output)
  const mp4File = ffmpeg.FS("readFile", "output.mp4");
  //메모리에 존재하는 output.mp4파일을 다운로드 받는다.
  const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
  //buffer는 영상 data를 binart data로 변경해준 것 같음
  const mp4Url = URL.createObjectURL(mp4Blob);

  const a = document.createElement("a");
  a.href = mp4Url;
  a.download = "MyRecording.mp4"; //a.download는 이동하는게 아니라 다운로드 받을 수 있다.
  document.body.appendChild(a);
  a.click();
};

const handleStop = () => {
  startBtn.innerText = "Download Recording";
  startBtn.removeEventListener("click", handleStop);
  startBtn.addEventListener("click", handleDownload);

  recorder.stop();
};

startBtn.addEventListener("click", handleStart);
