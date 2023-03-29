import { addDivs, gameLoop } from "./game.js";

const Ship = (length) => {
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

const Gameboard = () => {
  return {
    ships: [],
    board: [],
    newBoard: function () {
      for (let i = 0; i < 10; i++) {
        this.board[i] = [];
        for (let j = 0; j < 10; j++) {
          this.board[i][j] = "W";
        }
      }
    },
    receiveAttack: function (x, y) {
      if (board[x][y] == "W") board[x][y] = "X";
      else if (board[x][y][0] == "S") this.ships[board[x][y][1]].hit();
    },
    allShipsSunk: function () {
      for (let i = 0; i < 5; i++) {
        if (!this.ships[i].isSunk()) return false;
      }
      return true;
    },
  };
};

function generateNumber(max) {
  return Math.floor(Math.random() * max);
}

function isNearbyEmpty(board, size, x, y) {
  for (let i = 0; i < size; i++) {
    if (board[y][x + i] != "W") return false;
  }
  return true;
}

function createShips(board) {
  let sizes = [5, 4, 3, 3, 2];
  let x = "";
  let y = "";

  for (let i = 0; i < 5; i++) {
    do {
      x = generateNumber(9 - sizes[i] + 1);
      y = generateNumber(9);
    } while (!isNearbyEmpty(board.board, sizes[i], x, y));

    let newShip = Ship(sizes[i]);
    board.ships.push(newShip);
    console.log(board.ships);

    for (let j = 0; j < sizes[i]; j++) {
      board.board[y][x + j] = "S" + i;
    }
  }
}

export let playerBoard = Gameboard();
playerBoard.newBoard();

export let computerBoard = Gameboard();
computerBoard.newBoard();

createShips(playerBoard);
createShips(computerBoard);

console.log(playerBoard.board);
console.log(computerBoard.board);

let playerBoardDiv = document.querySelector("#playerBoard");
let computerBoardDiv = document.querySelector("#computerBoard");

addDivs(playerBoardDiv);
addDivs(computerBoardDiv);

gameLoop(playerBoard, computerBoard);
