const { expect, test } = require("@jest/globals");
const { describe } = require("yargs");
const {
  makeBoard,
  isValidPosition,
  placeMark,
} = require("../tic-tac-toe/ticTacToe.js");

describe("makeBoard", () => {
  test("returns a matrix of a given length", () => {
    expect(makeBoard(4).length).toBe(4);
    expect(makeBoard(4)[0].length).toBe(4);
    expect(makeBoard(4).length).toBe(2);
    expect(makeBoard(4)[0].length).toBe(2);
  });
  test("returns a matrix of a length 3 when no argument is passed", () => {
    expect(makeBoard().length).toBe(3);
    expect(makeBoard()[0].length).toBe(3);
  });

  test("fills the matrix with null values only", () => {
    const board = makeBoard();
    expect(board.every((row) => row.every((el) => el === null)));
  });
});

describe("isValidPosition", () => {
  test("returns false for values outside of boards range", () => {
    const board = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    expect(isValidPosition(-1, 0, board)).toBe(false);
    expect(isValidPosition(0, -1, board)).toBe(false);
    expect(isValidPosition(3, 0, board)).toBe(false);
    expect(isValidPosition(0, 3, board)).toBe(false);
  });
  test("returns if space is null or not", () => {
    const board = [
      [null, null, null],
      [null, "x", null],
      [null, null, null],
    ];
    expect(isValidPosition(0, 0, board)).toBe(true);
    expect(isValidPosition(1, 1, board)).toBe(false);
  });
});