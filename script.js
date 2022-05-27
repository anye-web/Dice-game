"use strict";

// Selecting UI Elements
const headPrimaryEl = document.querySelector(".heading-primary");
const headWinnerEl = document.querySelector(".heading-winner");
const headSecondaryEl = document.querySelector(".heading-secondary");

const btnFriendEl = document.querySelector(".btn--friend");
const btnOpponentEl = document.querySelector(".btn--opponent");
const btnStartEl = document.querySelector(".btn--start");
const btnPlayEl = document.querySelector(".btn--play");
const btnPlayAgainEl = document.querySelector(".btn--playAgain");
const btnRestartEl = document.querySelector(".btn--restart");

const formEl = document.querySelector(".form");
const player0InputEl = document.querySelector("#name--0");
const player1InputEl = document.querySelector("#name--1");

const player0Name = document.querySelector(".player--name-0");
const player1Name = document.querySelector(".player--name-1");

const player0ScoreEl = document.querySelector(".score--0");
const player1ScoreEl = document.querySelector(".score--1");

const diceBoxEl = document.querySelector(".dice-box");
const imgEl = document.querySelectorAll(".img");
const img0El = document.querySelector(".img--0");
const img1El = document.querySelector(".img--1");

// Input values
let player0Value, player1Value;

// Players score
let player0Score = 0;
let player1Score = 0;

// Starting Options
const choosingOpponent = function (message) {
  headPrimaryEl.classList.toggle("hidden");
  headSecondaryEl.textContent = message;
  formEl.classList.toggle("hidden");
  btnFriendEl.classList.toggle("hidden");
  btnOpponentEl.classList.toggle("hidden");
  btnStartEl.classList.toggle("hidden");
};
const play = function (message) {
  diceBoxEl.classList.toggle("hidden");
  btnPlayEl.classList.toggle("hidden");

  btnPlayAgainEl.classList.toggle("hidden");
  btnRestartEl.classList.toggle("hidden");

  headPrimaryEl.classList.toggle("hidden");
  headPrimaryEl.textContent = "Congratulations !!!";

  headSecondaryEl.textContent = message;
  headWinnerEl.classList.toggle("hidden");
};

// Choosing Opponent
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn--friend")) {
    // Hide the welcome message
    // Ask the user to enter their names
    // display only one button to start game
    choosingOpponent("Enter You and Your opponent names");
  } else if (e.target.classList.contains("btn--opponent")) {
    // All thesame starting Options but for the fact that opponent input is disable.
    // And a value is automatic given to it
    choosingOpponent("Enter Your name");
    player1InputEl.value = "Anye(Comp🤖)";
    player1InputEl.disabled = true;
  }
});

// Start Game
btnStartEl.addEventListener("click", function () {
  // Display the Play game option
  // Extract and store the values of the input field
  // Set the player's name to each underneth their points and
  //  Display a good luck message
  if (player0InputEl.value && player1InputEl) {
    headSecondaryEl.textContent =
      "Good Luck !! (first to reach 10 points wins)";
    formEl.classList.toggle("hidden");

    btnPlayEl.classList.toggle("hidden");
    btnStartEl.classList.toggle("hidden");
    diceBoxEl.classList.toggle("hidden");

    // Setting player scores to zero
    player0ScoreEl.textContent = player0Score;
    player1ScoreEl.textContent = player1Score;

    // Input values
    player0Value = player0InputEl.value;
    player1Value = player1InputEl.value;

    player0Name.textContent = player0Value;
    player1Name.textContent = player1Value;
  } else {
    headSecondaryEl.textContent = "Please enter names !!";
  }
});

// Play Game
btnPlayEl.addEventListener("click", function () {
  if (player0Score < 10 && player1Score < 10) {
    for (let i = 0; i < imgEl.length; i++) {
      imgEl[i].classList.toggle("animate");
    }

    let ranNum1 = Math.trunc(Math.random() * 6) + 1;
    let ranNum2 = Math.trunc(Math.random() * 6) + 1;
    console.log(ranNum1, ranNum2);

    img0El.src = `dice-${ranNum1}.png`;
    img1El.src = `dice-${ranNum2}.png`;

    if (ranNum1 > ranNum2) {
      player0Score += 1;
      player0ScoreEl.textContent = player0Score;
      headSecondaryEl.textContent = ` ${player0Value} Got 1 point !!`;
    } else if (ranNum2 > ranNum1) {
      player1Score += 1;
      player1ScoreEl.textContent = player1Score;
      headSecondaryEl.textContent = ` ${player1Value} Got 1 point !!`;
    } else {
      headSecondaryEl.textContent = ` Draw Game ⚔`;
    }
  } else {
    play(
      `${player0Value}(${player0Score}) Vs ${player1Value}(${player1Score}) `
    );

    // Display Winner
    if (player0Score === 10 && player1Score < 10) {
      headWinnerEl.textContent = `${player0Value} Won !! 🏆`;
    } else {
      headWinnerEl.textContent = `${player1Value} Won !! 🏆`;
    }
  }
});

// Playing Again or Restarting the Game

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn--playAgain")) {
    play("Good Luck !! (first to reach 10 points wins)");
    player0Score = 0;
    player1Score = 0;
    player0ScoreEl.textContent = player0Score;
    player1ScoreEl.textContent = player1Score;
  } else if (e.target.classList.contains("btn--restart")) {
    location.reload();
    return false;
  }
});
