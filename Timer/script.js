let x;
let isTimerRunning = false;
let startTime;
let isTimerPaused = false;
let totalMilliseconds;
let remainingTime;

function startTimer() {
    if (!isTimerRunning) {
        const inputHours = parseInt(document.getElementById('hours-input').value) || 0;
        const inputMinutes = parseInt(document.getElementById('minutes-input').value) || 0;
        const inputSeconds = parseInt(document.getElementById('seconds-input').value) || 0;

        totalMilliseconds = (inputHours * 3600000) + (inputMinutes * 60000) + (inputSeconds * 1000);

        if (isTimerPaused) {
            startTime = Date.now() - (totalMilliseconds - remainingTime);
        } else {
            startTime = Date.now();
        }

        isTimerRunning = true;

        x = setInterval(function () {
            const elapsedTime = Date.now() - startTime;
            remainingTime = totalMilliseconds - elapsedTime;

            if (remainingTime >= 0) {
                const hours = Math.floor(remainingTime / (1000 * 60 * 60));
                const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

                const timerElement = document.getElementById("timer");
                timerElement.innerHTML = hours + " Hour(s) : " + minutes + " Minute(s) : " + seconds + " Second(s)";

                // Change text color to blue
                timerElement.style.color = "skyblue";
            } else {
                clearInterval(x);
                isTimerRunning = false;
                startStopwatch();
            }
        }, 1000);
    }
}

function startStopwatch() {
    let elapsedTime = 0;
    let isVisible = true;
    x = setInterval(function () {
        elapsedTime += 1000;

        const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

        const timerElement = document.getElementById("timer");
        timerElement.innerHTML = "-" + hours + " Hour(s) : " + "-" + minutes + " Minute(s) : " + "-" + seconds + " Second(s)";

        // Flashing effect
        isVisible = !isVisible;
        timerElement.style.visibility = isVisible ? 'visible' : 'hidden';

        // Change text color to red
        timerElement.style.color = "red";
    }, 500);
}

function resetTimer() {
    clearInterval(x);
    document.getElementById('hours-input').value = '';
    document.getElementById('minutes-input').value = '';
    document.getElementById('seconds-input').value = '';
    document.getElementById("timer").innerHTML = '';
    document.getElementById("timer-expired-message").style.display = "none";
    isTimerRunning = false;
    isTimerPaused = false;
}

function stopTimer() {
    if (isTimerRunning) {
        clearInterval(x);
        isTimerRunning = false;
        isTimerPaused = true;
        document.getElementById("stop-button").textContent = "Continue";
    } else {
        isTimerPaused = false;
        document.getElementById("stop-button").textContent = "Stop";
        startTimer();
    }
}
