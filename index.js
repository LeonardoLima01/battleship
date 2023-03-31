import { addDivs } from "./game.js";

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

function checkNearby(x, y, length, board) {
  if (x + length > 9) return;

  for (y; y < 3; y++) {
    for (x; x < length + 2; x++) {
      if (y - 1 >= 0 && x - 1 >= 0 && y - 1 <= 9 && x - 1 <= 9) {
        if (board[y - 1][x - 1] != "W") {
          return false;
        }
      }
    }
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
    placeShip: function (x, y) {
      if (checkNearby(x, y, this.sizes[this.count], this.board)) {
        for (let i = 0; i < this.sizes[this.count]; i++) {
          board[y][x + i] = "S" + this.count;
        }
        let newShip = Ship(this.sizes[this.count]);
        this.ships.push(newShip);
        this.count++;
      }
    },
    receiveAttack: function (x, y) {
      if (this.board[y][x] == "W") this.board[y][x] = "X";
      else if (this.board[y][x][0] == "S") {
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
