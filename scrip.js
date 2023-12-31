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
  let result = {
    "winner": -1,
    "message": ""
  };

  if ((OPTIONS[playerSelection] + 1) % 3 == OPTIONS[botSelection]) {
    result["winner"] = 1;
    result["message"] = `${botSelection.charAt(0).toUpperCase() + botSelection.substring(1)} beats ${playerSelection.charAt(0).toUpperCase() + playerSelection.substring(1)}`;
  }
  else if ((OPTIONS[botSelection] + 1) % 3 == OPTIONS[playerSelection]) {
    result["winner"] = 0;
    result["message"] = `${playerSelection.charAt(0).toUpperCase() + playerSelection.substring(1)} beats ${botSelection.charAt(0).toUpperCase() + botSelection.substring(1)}`;
  }
  else {
    result["winner"] = -1;
    result["message"] = `Both where ${playerSelection.charAt(0).toUpperCase() + playerSelection.substring(1)}`
  }

  return result;  
}

function showScoreboard(playerPoints, botPoints) {
  console.log(`---Scoreboard---
  Player: ${playerPoints}
  Bot: ${botPoints}`);
}

function startGame() {
  alert("Wellcome to the Rock, Paper, Scissor Game");
  let botPoints = 0;
  let playerPoints = 0;
  let winner = -1;
  while (winner == -1) {
    showScoreboard(playerPoints, botPoints);
    let result = playRound(getUserSelection(), getBotSelection());
    if (result["winner"] == -1) {
      result["message"] = DRAW_ROUND + " " + result["message"]; 
    } else if (result["winner"] == 1) {
      botPoints++;
      result["message"] = PLAYER_2_WIN_ROUND + " " + result["message"];
      if (botPoints == 4) {
        winner = 1;
      }
    } else {
      playerPoints++;
      result["message"] = PLAYER_1_WIN_ROUND + " " + result["message"];
      if (playerPoints == 4) {
        winner = 0;
      }
    }
    console.log(result["message"]);
  }
  if (winner == 0) {
    console.log(PLAYER_1_WINNER);
  }
  else {
    console.log(PLAYER_2_WINNER);
  }
}

startGame();