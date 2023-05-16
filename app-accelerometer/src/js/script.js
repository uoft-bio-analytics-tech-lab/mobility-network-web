const txtOut = document.getElementById("output");
const txtID = document.getElementById("txt-id");
const txtTrial = document.getElementById("txt-trials");
const canvasPlot = document.getElementById("canvas-plot");
const btnRec = document.getElementById("btn-rec");
const btnAdd = document.getElementById("btn-add");
const btnSave = document.getElementById("btn-save");

const AppData = {
    recording: false,
    recordings: [],
    trial: 1,
    ixyzt: [[],[],[],[],[]]
}

window.onload = function () {
    window.addEventListener('devicemotion', handleMotion);
    // Set button functions
    btnRec.onclick = function () { handleRecord() };
    btnAdd.onclick = function () { handleAdd() };
    btnSave.onclick = function () { handleSave() };
    // Init plot
    plotData([[0],[0],[0],[0],[0]]);
}

function handleRecord() {
    AppData.recording = !AppData.recording;
    if (AppData.recording) {
        AppData.ixyzt = [[],[],[],[],[]];
        btnRec.innerHTML = "Stop Recording";
        btnRec.classList.remove("btn-success");
        btnRec.classList.add("btn-danger");
    } else {
        btnRec.innerHTML = "Start Recording";
        btnRec.classList.remove("btn-danger");
        btnRec.classList.add("btn-success");
    }
}

function handleAdd() {
    if (AppData.ixyzt[0].length > 0) {
        AppData.recordings.push(AppData.ixyzt);
        AppData.ixyzt = [[],[],[],[],[]];
        AppData.trial++;
        txtTrial.innerHTML = "Trials Saved: " + AppData.recordings.length;
        console.log(AppData.recordings);
    }
}

function handleSave() {
    if (~AppData.recording && AppData.recordings.length > 0) {
        // Create CSV text
        csvContent = ""
        for (i=0; i<AppData.recordings.length; i++) {
            csvContent += csvConstructor(['trial', 'x', 'y', 'z', 'time'], AppData.recordings[i]);
        }
        
        var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        var link = document.createElement("a");

        // Create filename
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let seconds = date.getSeconds();
        var filename = txtID.value + '_' + day + '-' + month + '-' + year
            + '_' + hour + '-' + minute + '-' + seconds + '.csv';

        // Download Blob
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}

function handleMotion(e) {
    if (AppData.recording) {
        txtOut.innerHTML = e.accelerationIncludingGravity.x
        + ", " + e.accelerationIncludingGravity.y
        + ", " + e.accelerationIncludingGravity.z;
        AppData.ixyzt[0].push(AppData.trial);
        AppData.ixyzt[1].push(e.accelerationIncludingGravity.x);
        AppData.ixyzt[2].push(e.accelerationIncludingGravity.y);
        AppData.ixyzt[3].push(e.accelerationIncludingGravity.z);
        AppData.ixyzt[4].push(e.timeStamp);

        plotData(AppData.ixyzt);
    }
}

function plotData(ixyzt) {
    // Define Data
    var trace1 = {x: ixyzt[4], y: ixyzt[1], name: 'X', mode: 'lines'};
    var trace2 = {x: ixyzt[4], y: ixyzt[2], name: 'Y', mode: 'lines'};
    var trace3 = {x: ixyzt[4], y: ixyzt[3], name: 'Z', mode: 'lines'};
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

function toCsvRows(headers, columns) {
    const output = [headers]
    const numRows = columns.map(col => col.length)
      .reduce((a, b) => Math.max(a, b))
  
    for (let row = 0; row < numRows; row++) {
      output.push(columns.map(c => c[row] || ''))
    }
  
    return output
  }
  
  function toCsvString(data) {
    let output = ''
    data.forEach(row => output += row.join(',') + '\n')
    return output
  }
  
  function csvConstructor(headers, columns) {
    return toCsvString(toCsvRows(headers, columns))
  }