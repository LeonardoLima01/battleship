import { playerBoard, computerBoard } from "./index.js";

export function addDivs(board) {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let newDiv = document.createElement("div");
      newDiv.className = "x" + j + "y" + i;
      newDiv.style.border = "2px solid black";
      board.appendChild(newDiv);

      newDiv.addEventListener("click", () => {
        let xValue = newDiv.className[1];
        let yValue = newDiv.className[3];

        if (newDiv.parentNode.id == "playerBoard") {
          if (playerBoard.board[yValue][xValue][0] == "S") {
            newDiv.style.backgroundColor = "red";
          }
        } else {
          if (computerBoard.board[yValue][xValue][0] == "S") {
            newDiv.style.backgroundColor = "red";
          }
        }
      });
    }
  }
}

export function gameLoop(playerBoard, computerBoard) {
  let playerBoardDiv = document.querySelector("#playerBoard");
  let computerBoardDiv = document.querySelector("#computerBoard");

  computerBoardDiv.style.borderColor = "red";

  //while (!playerBoard.allShipsSunk() && !computerBoard.allShipsSunk()) {}

  if (playerBoard.allShipsSunk()) alert("Computer Wins!!!");
  else if (computerBoard.allShipsSunk()) alert("Player Wins!!!");
}
