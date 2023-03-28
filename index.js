export const ship = (length) => {
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
