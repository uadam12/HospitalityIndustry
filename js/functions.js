const images = [
    "Balloon whisk",
    "Blander",
    "Box grater",
    "Bread basket",
    "Colander",
    "Cookies cutters",
    "Cup",
    "Dishwasher",
    "Fine strainer",
    "Fork",
    "Garlic press",
    "Instant read thermometer",
    "Jug",
    "Juicer",
    "Knife",
    "Ladle",
    "Microplane grater",
    "Mixing bowl",
    "Pan",
    "Pastry scraper",
    "Plate",
    "Pot",
    "Potato masher",
    "Rolling pin",
    "Sieve",
    "Sink",
    "Spatula",
    "Spoon",
    "Teapot",
    "Thermos",
    "Tin opener",
    "Toaster",
    "Tong",
    "Tray",
    "Vegetable peeler",
    "Wok",
    "Wooden cutting board"
];
const getRandomNumber = limit => Math.floor(Math.random() * limit);
const newImages = () => [...images].sort(() => 0.5 - Math.random());
const waitingPeriod = 3000;
let correctAnswers=0, number=0, userScore=0, ticking, messaging;

function setHighScore(score) {
    localStorage.setItem("highScore", Math.max(getHighScore(), score));
}

function getHighScore() {
    const score = localStorage.getItem("highScore");

    return score? score: 0;
}

function displayResult() {
    clearInterval(ticking);
    message.innerHTML = `You have answered ${correctAnswers} out of ${images.length} correctly.`;

    showMessage();

    options.forEach(option => 
        option.removeEventListener("click", choosing));
        
    const reloading = setTimeout(() => {
        clearTimeout(reloading);
        setHighScore(userScore);
        location.reload();
    }, 5500);
}
function nextQuestion(img) {
    const availableOptions = [img];
    let option = img;

    for(i = 1; i<4; i++) {
        while(availableOptions.includes(option)) 
            option = images[getRandomNumber(images.length)];

        availableOptions.push(option);
    }

    availableOptions.sort(() => 0.5 - Math.random());

    questionNumber.innerHTML = ++number;
    image.src = "images/"+img+".jpeg";

    for(n in availableOptions) 
        options[n].innerHTML = availableOptions[n];

    timing();
}
function displayQuestion() {
    const nextImage = currentImages.pop();

    if(nextImage) nextQuestion(nextImage);
    else displayResult();

    evalAnswer = false;
}

function timing() {
    let time = 10000;
    let timeLeft = time;

    timer.style.width = "100%";
    clearInterval(ticking);

    setTimeout(() => {
        ticking = setInterval(() => {
            timer.style.width = timeLeft/time*100+"%";

            if(timeLeft <= 0) {
                message.innerHTML = "Timeout +0";
                showMessage(true);
                displayQuestion();
            } else timeLeft--;
        }, 1);
    }, 10);
}