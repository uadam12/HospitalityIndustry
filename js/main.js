const score = document.getElementById("score");
const highScore = document.getElementById("high-score");
const questionNumber = document.getElementById("number");
const timer = document.getElementById("timer");
const image = document.getElementById("img");
const options = Array.from(document.querySelectorAll(".options > button.option"));
const msg = document.querySelector(".msg");
const message = document.getElementById("message");
let currentImages = newImages(), evalAnswer;

function showMessage(errorMsg=false) {
    msg.className = "msg";
    if(errorMsg) msg.classList.add("error");
    msg.classList.add("show");

    score.innerHTML = userScore;

    clearTimeout(messaging);
    messaging = setTimeout(() => msg.classList.remove("show"), waitingPeriod);
}

function choosing(e) {
    if(evalAnswer) 
        return message.innerHTML = "Please wait...";

    const answer = e.target.innerHTML;
    const src = image.getAttribute("src");
    const correctAnswer = src.substring(7, src.lastIndexOf("."));
    const wrong = answer != correctAnswer;

    if(wrong) message.innerHTML = "Wrong: "+ correctAnswer;
    else {
        correctAnswers++;
        userScore += 5;
        message.innerHTML = "Correct: +5";
    }

    showMessage(wrong);
    clearInterval(ticking);

    setTimeout(displayQuestion, waitingPeriod);
    evalAnswer = true;
}

highScore.innerHTML = getHighScore();

const start = setTimeout(() => {
    msg.className = "msg";
    options.forEach(option => option.addEventListener("click", choosing));
    displayQuestion();
    clearTimeout(start);
}, 5000);