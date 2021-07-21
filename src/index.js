const video = document.querySelector("#video");
const recordStartButton = document.getElementById("record-start");
const recordStopButton = document.getElementById("record-stop");
const recordedChunks = [];
let mediaRecorder;

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices
    .getUserMedia({ audio: true, video: true })
    .then(function (stream) {
      recorder(stream);
      video.srcObject = stream;
    })
    .catch(function (err) {
      console.log(err);
      console.log("Something went wrong!");
    });
}

function recorder(stream) {
  const options = {
    audioBitsPerSecond: 128000,
    videoBitsPerSecond: 2500000,
    mimeType: "video/mp4",
  };

  mediaRecorder = new MediaRecorder(stream, options);
  mediaRecorder.addEventListener("dataavailable", function (e) {
    if (e.data.size > 0) {
      console.log(e.data);
      recordedChunks.push(e.data);
    }
  });

  mediaRecorder.addEventListener("stop", function () {
    let blob = new Blob(recordedChunks);
    let audio = document.querySelector("audio");
    audio.src = window.URL.createObjectURL(blob);

    // if video data
    // let blob = new Blob(chunks, { 'type': 'video/mp4' });
    // let video = document.querySelector('video');
    // video.src = window.URL.createObjectURL(blob);
  });
}

recordStartButton.addEventListener("click", () => mediaRecorder.start());

recordStopButton.addEventListener("click", () => mediaRecorder.stop());
