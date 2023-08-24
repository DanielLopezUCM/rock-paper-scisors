const NUM_OPTIONS = 3;
const OPTIONS = {
  0: "rock",
  1: "paper",
  2: "scissor",
  "rock": 0,
  "paper": 1,
  "scissor": 2
};
const POINTS_WINNER = 4;
const PLAYER_1_WIN_ROUND = "You win!";
const PLAYER_2_WIN_ROUND = "You loose!";
const DRAW_ROUND = "Draw!";
const PLAYER_1_WINNER = "You win the game!";
const PLAYER_2_WINNER = "You loose the game!";

function getBotSelection() {
  return OPTIONS[Math.floor(Math.random() * NUM_OPTIONS)];
}

function checkSelection(selection) {
  let i = 0;
  let founded = false;
  while(i < NUM_OPTIONS && !founded) {
    founded = selection === OPTIONS[i];
    i++;
  }
  return founded;
}

function getUserSelection() {
  
  let selection = "";
  do {
    selection = prompt("Which is your selection?", "Rock, paper or scissor");
    selection = selection.toLowerCase();
  } while (!checkSelection(selection))
  return selection;
}

function playRound(playerSelection, botSelection) {
  let message = "";
  if ((OPTIONS[playerSelection] + 1) % 3 == OPTIONS[botSelection]) {

    const points = document.querySelector("#botPoints > .points");
    let botPoints = parseInt(points.textContent);
    botPoints++;
    points.textContent = botPoints;

    if (botPoints >= POINTS_WINNER) {
      message = PLAYER_2_WINNER;
      endGame();
    }
    else {
      message = PLAYER_2_WIN_ROUND + `${botSelection.charAt(0).toUpperCase() + botSelection.substring(1)} beats ${playerSelection.charAt(0).toUpperCase() + playerSelection.substring(1)}`;
    }
  }
  else if ((OPTIONS[botSelection] + 1) % 3 == OPTIONS[playerSelection]) {
    
    const points = document.querySelector("#playerPoints > .points");
    let playerPoints = parseInt(points.textContent);
    playerPoints++;
    points.textContent = playerPoints;

    if (playerPoints >= POINTS_WINNER) {
      message = PLAYER_1_WINNER;
      endGame();
    }
    else {
      message = PLAYER_1_WIN_ROUND + `${playerSelection.charAt(0).toUpperCase() + playerSelection.substring(1)} beats ${botSelection.charAt(0).toUpperCase() + botSelection.substring(1)}`;
    }
  }
  else {
    message = DRAW_ROUND + `Both where ${playerSelection.charAt(0).toUpperCase() + playerSelection.substring(1)}`
  }
  const result = document.querySelector("#result");
  result.textContent = message;
}

function enableButtons() {
  const buttons = document.querySelectorAll("#buttons > button");
  
  buttons.forEach((button) => {
    button.disabled = false;
  });
}

function disableButtons() {
  const buttons = document.querySelectorAll("#buttons > button");
  
  buttons.forEach((button) => {
    button.disabled = true;
  });
}

function setUpButtons() {
  const buttons = document.querySelectorAll("#buttons > button");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      playRound(button.id, getBotSelection());
    });
  });

  const restartButton = document.querySelector("#restartButton")
  restartButton.addEventListener("click", () => reset());
}

function disableRestartButton() {
  const restartContainer = document.querySelector("#restartContainer");
  restartContainer.style.display = "none";
}

function enableRestartButton() {
  const restartContainer = document.querySelector("#restartContainer");
  restartContainer.style.display = "flex";
}

function resetPoints() {
  const playerPoints = document.querySelector("#playerPoints > .points");
  playerPoints.textContent = "0";
  
  const botPoints = document.querySelector("#botPoints > .points");
  botPoints.textContent = "0";
}

function resetResult() {
  const result = document.querySelector("#result");
  result.textContent = "Wellcome to the Rock Paper Scissor game";
}

function reset() {
  enableButtons();
  disableRestartButton();
  resetPoints();
  resetResult();
}

function endGame() {
  disableButtons();
  enableRestartButton();
}

disableRestartButton();
setUpButtons();