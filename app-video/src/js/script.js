const Video1 = document.getElementById("video-1");
const Video2 = document.getElementById("video-2");
const Video3 = document.getElementById("video-3");
const Video4 = document.getElementById("video-4");
const File1 = document.getElementById("file-1");
const File2 = document.getElementById("file-2");
const File3 = document.getElementById("file-3");
const File4 = document.getElementById("file-4");
const AppData = {
    videoLoaded: [false, false, false, false]
};

window.onload = function () {
    setVideoSize(360, 240);
    handleLoadVideo();
}

function setVideoSize(width, height) {
    Video1.width = width;
    Video2.width = width;
    Video3.width = width;
    Video4.width = width;
    
    Video1.height = height;
    Video2.height = height;
    Video3.height = height;
    Video4.height = height;
}

function handleLoadVideo() {
    File1.onchange = e => { loadVideo(e, Video1, 0) };
    File2.onchange = e => { loadVideo(e, Video2, 1) };
    File3.onchange = e => { loadVideo(e, Video3, 2) };
    File4.onchange = e => { loadVideo(e, Video4, 3) };
}

function loadVideo(e, VideoDOM, i) {
    var file = e.target.files[0];
    var URL = window.URL || window.webkitURL 
    var fileURL = URL.createObjectURL(file)
    VideoDOM.src = fileURL;
    // Update AppData
    AppData.videoLoaded[i] = true;
    console.log(AppData.videoLoaded)
}