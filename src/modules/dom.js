import { playerBoard, computerBoard, checkNearby, gameLoop } from "../index.js";

let player = document.querySelector("#playerBoard");
let computer = document.querySelector("#computerBoard");
let arr = [player, computer];

let computerDiv = document.querySelector(".container-c");
let playerTitle = document.querySelector(".p-title");

let refreshButton = document.querySelector("#endContainer > button");
refreshButton.addEventListener("click", () => {
  window.location.reload();
});

export function createDivs() {
  for (let board of arr) {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        let newDiv = document.createElement("div");
        newDiv.className = "x" + j + "y" + i;
        newDiv.style.border = "2px solid black";
        newDiv.style.backgroundColor = "white";
        newDiv.style.opacity = "1";

        if (board == computer) {
          newDiv.addEventListener("click", () => {
            let x = newDiv.className[1];
            let y = newDiv.className[3];

            computerBoard.receiveAttack(x, y);
            gameLoop();
          });
        } else {
          newDiv.addEventListener("click", () => {
            if (newDiv.style.backgroundColor == "green") {
              let x = newDiv.className[1];
              let y = newDiv.className[3];

              playerBoard.placeShip(x, y, 1);

              if (playerBoard.count == 5) {
                computerDiv.style.display = "flex";
                playerTitle.textContent = "Your board";
              }
            }
          });

          newDiv.addEventListener("mouseover", () => {
            if (
              checkNearby(
                newDiv.className[1],
                newDiv.className[3],
                playerBoard.sizes[playerBoard.count],
                playerBoard
              )
            ) {
              let a = newDiv;
              for (let i = 0; i < playerBoard.sizes[playerBoard.count]; i++) {
                a.style.backgroundColor = "green";
                a = a.nextElementSibling;
              }
            }
          });

          newDiv.addEventListener("mouseout", () => {
            let a = newDiv;
            for (let i = 0; i < 10; i++) {
              if (a) {
                if (a.style.backgroundColor == "green") {
                  a.style.backgroundColor = "white";
                  a = a.nextElementSibling;
                }
              }
            }
          });
        }
        if (board) board.appendChild(newDiv);
      }
    }
  }
}
