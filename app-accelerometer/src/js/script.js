const txtOut = document.getElementById("output");
const canvasPlot = document.getElementById("canvas-plot");
let xyzt = [[],[],[],[]]

window.addEventListener('devicemotion', handleMotion);

function handleMotion(e) {
    txtOut.innerHTML = e.accelerationIncludingGravity.x
                        + ", " + e.accelerationIncludingGravity.y
                        + ", " + e.accelerationIncludingGravity.z;
    xyzt[0].push(e.accelerationIncludingGravity.x)
    xyzt[1].push(e.accelerationIncludingGravity.y)
    xyzt[2].push(e.accelerationIncludingGravity.z)
    xyzt[3].push(e.timeStamp)

    plotData()
    //console.log(e)
}

function plotData() {
    // Define Data
    var trace1 = {x: xyzt[3], y: xyzt[0], name: 'X', mode: 'lines'};
    var trace2 = {x: xyzt[3], y: xyzt[1], name: 'Y', mode: 'lines'};
    var trace3 = {x: xyzt[3], y: xyzt[2], name: 'Z', mode: 'lines'};
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