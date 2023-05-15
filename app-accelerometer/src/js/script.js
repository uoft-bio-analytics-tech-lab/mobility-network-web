const txtOut = document.getElementById("output");
const txtID = document.getElementById("txt-id");
const canvasPlot = document.getElementById("canvas-plot");
const btnRec = document.getElementById("btn-rec");
const btnAdd = document.getElementById("btn-add");
const btnSave = document.getElementById("btn-save");

const AppData = {
    recording: false,
    recordings: [],
    xyzt: [[],[],[],[]]
}

window.addEventListener('devicemotion', handleMotion);

function handleMotion(e) {
    if (AppData.recording) {
        txtOut.innerHTML = e.accelerationIncludingGravity.x
        + ", " + e.accelerationIncludingGravity.y
        + ", " + e.accelerationIncludingGravity.z;
        AppData.xyzt[0].push(e.accelerationIncludingGravity.x);
        AppData.xyzt[1].push(e.accelerationIncludingGravity.y);
        AppData.xyzt[2].push(e.accelerationIncludingGravity.z);
        AppData.xyzt[3].push(e.timeStamp);

        plotData();
    }
}

function plotData() {
    // Define Data
    var trace1 = {x: AppData.xyzt[3], y: AppData.xyzt[0], name: 'X', mode: 'lines'};
    var trace2 = {x: AppData.xyzt[3], y: AppData.xyzt[1], name: 'Y', mode: 'lines'};
    var trace3 = {x: AppData.xyzt[3], y: AppData.xyzt[2], name: 'Z', mode: 'lines'};
    var data = [trace1, trace2, trace3];
    // Define Layout
    var layout = {
        title: "XYZ-Time",
        xaxis: {autorange: true, title: 'Time'},
        yaxis: {title: 'Acceleration'}
    };
    
    // Display using Plotly
    Plotly.newPlot(canvasPlot, data, layout);
}