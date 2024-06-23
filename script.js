let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let laps = [];

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('lapsList');

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        startStopButton.textContent = 'Start';
    } else {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateDisplay, 10);
        isRunning = true;
        startStopButton.textContent = 'Stop';
    }
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    startStopButton.textContent = 'Start';
    elapsedTime = 0;
    display.textContent = '00.00.00:00';
    laps = [];
    updateLaps();
}

function lap() {
    if (isRunning) {
        laps.push(elapsedTime);
        updateLaps();
    }
}

function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    const time = new Date(elapsedTime);
    const minutes = time.getUTCMinutes().toString().padStart(2, '0');
    const seconds = time.getUTCSeconds().toString().padStart(2, '0');
    const milliseconds = time.getUTCMilliseconds().toString().padStart(3, '0');
    display.textContent = `00.${minutes}.${seconds}:${milliseconds}`;
}

function updateLaps() {
    lapsList.innerHTML = '';
    laps.forEach((lapTime, index) => {
        const time = new Date(lapTime);
        const minutes = time.getUTCMinutes().toString().padStart(2, '0');
        const seconds = time.getUTCSeconds().toString().padStart(2, '0');
        const milliseconds = time.getUTCMilliseconds().toString().padStart(3, '0');
        const lapElement = document.createElement('li');
        lapElement.textContent = `Lap ${index + 1}: 00.${minutes}.${seconds}:${milliseconds}`;
        lapsList.appendChild(lapElement);
    });
}
