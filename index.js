export const Ship = (length) => {
  return {
    length,
    hits: 0,
    sunk: false,
    hit: function () {
      this.hits++;
      this.isSunk();
    },
    isSunk: function () {
      this.sunk = this.hits >= this.length ? true : false;
      return this.sunk;
    },
  };
};

function createBoard() {
  let arr = [];

  for (let i = 0; i < 10; i++) {
    arr[i] = [];
    for (let j = 0; j < 10; j++) {
      arr[i][j] = "";
    }
  }
  return arr;
}

export const Gameboard = () => {
  let i = 0;
  let sizes = [5, 4, 3, 3, 2];
  let board = createBoard();
  return {
    board,
    ships: [],
    placeShip: function (x, y) {
      if (x + sizes[i] - 1 <= 9) {
        this.ships.push(Ship(sizes[i]));

        for (let j = 0; j < sizes[i]; j++) {
          this.board[y][x + j] = "S" + i;
        }

        i++;
      }
    },
    receiveAttack: function (x, y) {
      // If attack hit water
      if (this.board[y][x] == "") this.board[y][x] = "X";
      // If attack hit a ship
      else if (this.board[y][x][0] == "S") {
        this.ships[board[y][x][1]].hit();
      }
    },
    allShipsSunk: function () {
      for (let i = 0; i < this.ships.length; i++) {
        if (!this.ships[i].isSunk()) return false;
      }
      return true;
    },
  };
};
