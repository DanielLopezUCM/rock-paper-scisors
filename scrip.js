const NUM_OPTIONS = 3;

const OPTIONS = {
  0: "rock",
  1: "paper",
  2: "scissor",
  "rock": 0,
  "paper": 1,
  "scissor": 2
};

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

console.log(playRound(getUserSelection(), getBotSelection()));