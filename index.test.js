import { ship } from ".";

test("ship factory function functionality", () => {
  let newShip = ship(3);

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
