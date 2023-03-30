import { playerBoard, computerBoard, generateNumber } from "./index.js";

export function addDivs(board) {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let newDiv = document.createElement("div");
      newDiv.className = "x" + j + "y" + i;
      newDiv.style.border = "2px solid black";
      newDiv.style.backgroundColor = "white";
      board.appendChild(newDiv);

      if (newDiv.parentNode.id == "computerBoard") {
        newDiv.addEventListener("click", () => {
          let xValue = newDiv.className[1];
          let yValue = newDiv.className[3];
          if (newDiv.style.backgroundColor == "white") {
            if (computerBoard.board[yValue][xValue][0] == "S") {
              computerBoard.ships[computerBoard.board[yValue][xValue][1]].hit();
              newDiv.style.backgroundColor = "red";
            } else if (computerBoard.board[yValue][xValue] == "W")
              newDiv.style.backgroundColor = "#34c6eb";
            gameLoop(playerBoard, computerBoard);
          }
        });
      }
    }
  }
}

function computerPlays(computerBoard, playerBoard) {
  let x = "";
  let y = "";

  do {
    x = generateNumber(10);
    y = generateNumber(10);
  } while (
    document.querySelector(`.x${x}y${y}`).style.backgroundColor != "white"
  );

  let selectedSquare = document.querySelector(`.x${x}y${y}`);

  if (playerBoard.board[y][x] == "W") {
    playerBoard.board[y][x] = "X";
    selectedSquare.style.backgroundColor = "#34c6eb";
  } else {
    playerBoard.ships[playerBoard.board[y][x][1]].hit();
    selectedSquare.style.backgroundColor = "red";
  }
}

export function gameLoop(playerBoard, computerBoard) {
  computerPlays(computerBoard.board, playerBoard);

  if (playerBoard.allShipsSunk()) alert("Computer Wins!!!");
  else if (computerBoard.allShipsSunk()) alert("Player Wins!!!");
}
