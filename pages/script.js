const boxes = document.getElementsByClassName("box");
const score = document.getElementById("score");
const hearts = document.getElementById("hearts");
const predictionInput = document.getElementById("prediction");
const resetButton = document.getElementById("reset-button");

const initialWord = "ADIEU";

let word;
let lives;
let playerScore;

function initialiseGame(){
    word = initialWord;
    lives = 3;
    playerScore = 0;
    score.textContent = 0;
    hearts.textContent = "❤︎❤︎❤︎";
    resetButton.hidden = true;

    for (const box of boxes) {
        box.src = '../images/box.png';
    }
}

function onSubmitButtonClicked(){
    if(lives <= 0){
        return;
    }

    if(resetButton.hidden){
        resetButton.hidden = false;
    }

    let prediction = predictionInput.value.toUpperCase().trim();
    let heartsText = hearts.textContent.trim();

    if(prediction.length == 1){
        if(word.includes(prediction)){
            playerScore += 20;
            score.textContent = playerScore;
            boxes[initialWord.indexOf(prediction)].src = `../images/letters/${prediction}.png`;
            word = word.replace(prediction,'');
        } else {
            lives--;
            heartsText = heartsText.slice(0, -2);
            hearts.textContent = heartsText;
        }
    } else if (prediction.length == 5){
        if(prediction == initialWord){
            playerScore = 100;
            score.textContent = playerScore;

            for (let i = 0; i < boxes.length; i++) {
                console.log(initialWord[i]);
                boxes[i].src = `../images/letters/${initialWord[i]}.png`;
            }
        } else {
            lives = 0;
            heartsText = '';
            hearts.textContent = heartsText;
        }
    } else{
        alert("Invalid prediction! Please either predict letter by letter or the whole word at once.")
    }

    predictionInput.value = '';

    if(playerScore >= 100) {
        // Added slight delay so that the page would be updated before displaying the alert.
        setTimeout(() => {
            alert("Congratulations! You have won.");
        }, 200);
    } else if (lives <= 0) {
        alert("You have lost!");
    }
}

initialiseGame();