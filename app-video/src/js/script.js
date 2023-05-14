const Video1 = document.getElementById("video-1");
const Video2 = document.getElementById("video-2");
const Video3 = document.getElementById("video-3");
const Video4 = document.getElementById("video-4");

window.onload = function () {
    setVideoSize(360, 240);
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