import { Ship, Gameboard } from ".";

test("Ship factory function functionality", () => {
  let newShip = Ship(3);

  expect(newShip.length).toBe(3);
  expect(newShip.hits).toBe(0);
  expect(newShip.isSunk()).toBe(false);
  expect(newShip.hits).toBe(0);
  newShip.hit();
  expect(newShip.hits).toBe(1);
  newShip.hit();
  newShip.hit();
  expect(newShip.hits).toBe(3);
  expect(newShip.isSunk()).toBe(true);
});

test("Gameboard factory function functionality", () => {
  let newBoard = Gameboard();

  newBoard.placeShip(0, 0);
  // prettier-ignore
  expect(newBoard.board[0]).toEqual(["S0", "S0", "S0", "S0", "S0", "", "", "", "", ""]);

  // Test if board keep track of missed attacks
  newBoard.receiveAttack(1, 1);
  expect(newBoard.board[1][1]).toBe("X");

  // Test if board doesn't overwrite ships with attacks
  newBoard.receiveAttack(1, 0);
  expect(newBoard.board[0][1]).toBe("S0");

  // Test if ship attacked .hits increases and isSunk function remains false
  expect(newBoard.ships[0].hits).toBe(1);
  expect(newBoard.ships[0].isSunk()).toBe(false);

  // Test if all ships on current board sunk
  expect(newBoard.allShipsSunk()).toBe(false);

  // Test if ship isSunk function changes to true after hits getting to ship's length
  newBoard.receiveAttack(1, 0);
  newBoard.receiveAttack(1, 0);
  newBoard.receiveAttack(1, 0);
  newBoard.receiveAttack(1, 0);
  expect(newBoard.ships[0].hits).toBe(5);
  expect(newBoard.ships[0].isSunk()).toBe(true);

  // Test if all ships on current board sunk
  expect(newBoard.allShipsSunk()).toBe(true);
});
