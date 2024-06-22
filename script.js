// script.js
let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let reset = false;
let laps = [];

const display = document.getElementById('display');
const startPauseButton = document.getElementById('startPause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

startPauseButton.addEventListener('click', startPause);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);

function startPause() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
        running = true;
        startPauseButton.textContent = 'Pause';
        reset = false;
    } else {
        clearInterval(tInterval);
        running = false;
        startPauseButton.textContent = 'Start';
    }
}

function resetStopwatch() {
    clearInterval(tInterval);
    reset = true;
    running = false;
    startPauseButton.textContent = 'Start';
    display.textContent = '00:00:00.000';
    laps = [];
    updateLaps();
}

function recordLap() {
    if (running) {
        const lapTime = display.textContent;
        laps.push(lapTime);
        updateLaps();
    }
}

function updateLaps() {
    lapsList.innerHTML = laps.map(lap => `<li>${lap}</li>`).join('');
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000));

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 100) ? "0" + milliseconds : milliseconds;
    milliseconds = (milliseconds < 10) ? "00" + milliseconds : milliseconds;

    display.textContent = hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}
