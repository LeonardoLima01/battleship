import { Gameboard } from "./index.js";

// Places ship
let b1 = Gameboard();
b1.placeShip(0, 0);

test("Ship is placed correctly", () => {
  expect(b1.board[0][0]).toBe("S0");
});

test("Ship was added to SHIP gameboard array", () => {
  expect(b1.ships[0]);
});

// Hits ship
let b2 = Gameboard();
b2.placeShip(0, 0);
b2.receiveAttack(0, 0);

test("Ship gets hit correctly", () => {
  expect(b2.board[0][0]).toBe("X");
});

// Ship sunks
b2.receiveAttack(1, 0);
b2.receiveAttack(2, 0);
b2.receiveAttack(3, 0);
b2.receiveAttack(4, 0);

b2.placeShip(0, 3);

b2.receiveAttack(0, 3);
b2.receiveAttack(1, 3);
b2.receiveAttack(2, 3);
b2.receiveAttack(3, 3);

test("Ship get hits and sunks", () => {
  expect(b2.ships[0].hits).toBe(5);
  expect(b2.ships[0].isSunk()).toBe(true);
  expect(b2.ships[1].hits).toBe(4);
  //expect(b2.ships[1].isSunk()).toBe(true);
});

//test("Detects if all ships sunk", () => {
//  expect(b2.allSunk()).toBe(true);
//});
