import { createDivs } from "./modules/dom.js";

export const Ship = (length) => {
  return {
    length,
    hits: 0,
    isSunk: function () {
      if (this.hits >= length) return true;
      return false;
    },
    hit: function () {
      this.hits++;
    },
  };
};

export function createBoard() {
  let arr = [];

  for (let i = 0; i < 10; i++) {
    arr[i] = [];
    for (let j = 0; j < 10; j++) {
      arr[i][j] = "W";
    }
  }
  return arr;
}

export function checkNearby(x, y, length, board) {
  for (let i = 0; i < length; i++) {
    if (board.board[y][+x + +i] != "W") return false;
  }
  return true;
}

export const Gameboard = () => {
  let board = createBoard();
  return {
    count: 0,
    sizes: [5, 4, 3, 3, 2],
    ships: [],
    board,
    placeShip: function (x, y, show = 0) {
      if (checkNearby(x, y, this.sizes[this.count], this)) {
        for (let i = 0; i < this.sizes[this.count]; i++) {
          board[y][+x + +i] = "S" + this.count;
          if (show == 1)
            document.querySelector(`.x${+x + +i}y${y}`).style.backgroundColor =
              "gray";
        }
        let newShip = Ship(this.sizes[this.count]);
        this.ships.push(newShip);
        this.count++;
      } else {
        this.placeShip(randomNum(10), randomNum(10), show);
      }
    },
    receiveAttack: function (x, y) {
      let selectedSquare =
        this.board == playerBoard.board
          ? document.querySelector(`#playerBoard > .x${x}y${y}`)
          : document.querySelector(`#computerBoard > .x${x}y${y}`);

      if (this.board[y][x] == "W") {
        selectedSquare.style.backgroundColor = "#669ffa";
        this.board[y][x] = "X";
      } else if (this.board[y][x][0] == "S") {
        selectedSquare.style.backgroundColor = "red";
        this.ships[this.board[y][x][1]].hit();
        this.board[y][x] = "X";
      }
    },
    allSunk: function () {
      for (let i = 0; i < this.count; i++) {
        if (!this.ships[i].isSunk()) return false;
      }
      return true;
    },
  };
};

let randomNum = (max) => Math.floor(Math.random() * max);

function createShips(board) {
  for (let i = 0; i < 5; i++) board.placeShip(randomNum(10), randomNum(10));
}

export let playerBoard = Gameboard();
export let computerBoard = Gameboard();
let computerDiv = document.querySelector(".container-c");
let playerTitle = document.querySelector(".p-title");
computerDiv.style.display = "none";
playerTitle.textContent = "Place your ships";

createShips(computerBoard);

createDivs();

function computerPlays() {
  let x = "";
  let y = "";

  do {
    x = randomNum(10);
    y = randomNum(10);
  } while (playerBoard.board[y][x] == "X");

  playerBoard.receiveAttack(x, y);
}

export function gameLoop() {
  computerPlays();

  if (playerBoard.allSunk() || computerBoard.allSunk()) {
    document.querySelector("#winner").textContent = playerBoard.allSunk()
      ? "The Enemy"
      : "The Player";
    document.querySelector("body>div").style.display = "none";
    document.querySelector("#endContainer").style.display = "flex";
  }
}

export const Player = () => {
  return {
    gameboard: Gameboard(),
  };
};
