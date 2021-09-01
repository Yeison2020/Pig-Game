'use strict';
// Note Seleting/getting element by ID and querySlector;
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

//-------------------------------------------------------
const diceEl = document.querySelector('.dice');

//-------------------------------------------------------
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
//----------------------------------------------
let scores;
let currentScore;
let activePlayer;
let playing;
//---------------------------------------------
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--active`);
  player0El.classList.add(`player--active`);
};
//-------------------------------------------

// ---------------------------------------------

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  //--- Here I'm adding and remove the class with toggle
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  // Here the active player will the point using the class current--{activePlayer}
};
//---------------------score-------------------------

// -----------------------Rolling dice -------------------
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Genrating a random dice Roll.
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Dsiplay the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 3. check for the roll 1: if true, swicth player
    if (dice !== 1) {
      // Compare note with notebook
      // Add dice to the current score:==> currentScore = currentScore + dice
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Swicth Next Player
      switchPlayer();

      //--- Here I'm adding and remove the class with toggle

      // Here the active player will the point using the class current--{activePlayer}
    }
  }
});

//-----------------------Holding the points-----------
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to the score of the active player
    // Working with the array using the score base on the active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. check if player's score is at least >= 100

    if (scores[activePlayer] >= 100) {
      // 3. Finish the Game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // 4. Swicth Players
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
