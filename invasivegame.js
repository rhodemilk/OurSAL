let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;
let timeLeft = 15;

window.onload = function() {
    document.getElementById("startButton").addEventListener("click", startGame);
  

}

function startGame() {
    setGame();
}

function resetGame() {
    // Clear the board
    document.getElementById("board").innerHTML = "";
    // Reset score and game over state
    score = 0;
    gameOver = false;
    // Reset score display
    document.getElementById("score").innerText = "Score: 0";
    // Reset current mole and plant tiles
    currMoleTile = null;
    currPlantTile = null;
}
// JavaScript

function setGame() {
    //set up the grid in html
    for (let i = 0; i < 9; i++) { //i goes from 0 to 8, stops at 9
        //<div id="0-8"></div>
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }
    setInterval(setMole, 1000); 
    setInterval(setPlant, 2000); 
  setInterval(updateTimer, 1000);
}
function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        document.getElementById("timer").innerText = "Time left: " + timeLeft;
    } else {
        endGame();
    }
}
function endGame() {
    // Clear the board
    document.getElementById("board").innerHTML = "";
    // Display final score
    document.getElementById("score").innerText = "Final Score: " + score;
    // Reset score, game over state, and time left
    score = 0;
    gameOver = false;
    timeLeft = 15;
    // Reset current mole and plant tiles
    currMoleTile = null;
    currPlantTile = null;
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
}

function getRandomTile() {
    //math.random --> 0-1 --> (0-1) * 9 = (0-9) --> round down to (0-8) integers
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {
    if (gameOver) {
        return;
    }
    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }
    let mole = document.createElement("img");
    mole.src = "img/snake-svgrepo-com.svg";

    let num = getRandomTile();
    if (currPlantTile && currPlantTile.id == num) {
        return;
    }
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) {
        return;
    }
    if (currPlantTile) {
        currPlantTile.innerHTML = "";
    }
    let plant = document.createElement("img");
    plant.src = "img/crocodile-svgrepo-com.svg";

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id == num) {
        return;
    }
    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile() {
    if (gameOver) {
        return;
    }
    if (this == currMoleTile) {
        score += 10;
        document.getElementById("score").innerText = score.toString(); //update score html
    }
    else if (this == currPlantTile) {
        document.getElementById("score").innerText = "GAME OVER: " + score.toString(); //update score html
        gameOver = true;
    }
}