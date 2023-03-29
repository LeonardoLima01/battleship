import { playerBoard, computerBoard } from "./index.js";

export function addDivs(board) {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let newDiv = document.createElement("div");
      newDiv.className = "x" + j + "y" + i;
      newDiv.style.border = "2px solid black";
      board.appendChild(newDiv);

      if (newDiv.parentNode.id == "computerBoard") {
        newDiv.addEventListener("click", () => {
          let xValue = newDiv.className[1];
          let yValue = newDiv.className[3];

          //if (newDiv.parentNode.id == "playerBoard") {
          if (playerBoard.board[yValue][xValue][0] == "S") {
            if (newDiv.style.backgroundColor != "red") {
              playerBoard.ships[playerBoard.board[yValue][xValue][1]].hit();
            }
            newDiv.style.backgroundColor = "red";
          } else if (playerBoard.board[yValue][xValue] == "W")
            newDiv.style.backgroundColor = "cyan";
          //} else {
          //  if (computerBoard.board[yValue][xValue][0] == "S") {
          //    if (newDiv.style.backgroundColor != "red") {
          //      computerBoard.ships[computerBoard.board[yValue][xValue][1]].hit();
          //   }
          //    newDiv.style.backgroundColor = "red";
          //  } else if (computerBoard.board[yValue][xValue] == "W")
          //    newDiv.style.backgroundColor = "cyan";
          //}
          gameLoop(playerBoard, computerBoard);
        });
      }
    }
  }
}

let playerBoardDiv = document.querySelector("#playerBoard");
let computerBoardDiv = document.querySelector("#computerBoard");

export function gameLoop(playerBoard, computerBoard) {
  if (playerBoard.allShipsSunk()) alert("Computer Wins!!!");
  else if (computerBoard.allShipsSunk()) alert("Player Wins!!!");
}
