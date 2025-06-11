const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let gamePoints = 0;
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];


function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? handleMatch() : unflipCards();
}

function handleMatch() {
  gamePoints += 2; // Increment the points by 2 for each match
  disableCards();

  // Check if the player has won
  if (gamePoints === cards.length) {
    displayWinOverlay();
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 800);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function displayWinOverlay() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });

  // alert("You win! You finished with " + gamePoints + " points. Reload to play again.");
  // const winOverlay = document.createElement('div');
  // winOverlay.classList.add('win-overlay');
  // winOverlay.innerHTML = `
  //   <h1 style="font-size:400%;padding:1rem; ">Congratulations!</h1>
  //   <h3 style="text-align:center;">You Win! Reload to play again. </h3>`;
  // document.body.appendChild(winOverlay);
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
