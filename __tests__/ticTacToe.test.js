const { describe, expect, test } = require("@jest/globals");
const readlineSync = require("readline-sync");

const {
  makeBoard,
  isValidPosition,
  placeMark,
  isBoardFull,
  horizontalWinnerOrNull,
  verticalWinnerOrNull,
  leftDiagonalWinnerOrNull,
  rightDiagonalWinnerOrNull,
  isGameOver,
  switchSymbol,
  formatRow,
  displayBoard,
  getRow,
  getCol,
  takeTurn,
} = require("../tic-tac-toe/ticTacToe.js");

const ticTacs = require("../tic-tac-toe/ticTacToe.js");

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

describe("placeMark", () => {
  test("updates the board with the symbol at the correct row and col", () => {
    const board = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    let returnedBoard = placeMark(0, 0, "x", board);
    expect(returnedBoard).toBe(board);
    expect(board[0][0]).toBe("x");

    expect(board[2][1]).toBeNull();
    placeMark(2, 1, "x", board);
    expect(board[2][1]).toBe("x");
  });
});

describe("isBoardFull", () => {
  test("returns false when board is full of null", () => {
    expect(
      isBoardFull([
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ])
    ).toBe(false);
  });
  test("returns false when board is not full", () => {
    expect(
      isBoardFull([
        ["x", null, null],
        [null, "o", null],
        [null, "x", "o"],
      ])
    ).toBe(false);
  });

  test("returns true when board is full", () => {
    expect(
      isBoardFull([
        ["x", "o", "x"],
        ["o", "o", "x"],
        ["x", "x", "o"],
      ])
    ).toBe(true);
  });
});

describe("horizontalWinnerOrNull", () => {
  test("returns null for non horizontal wins", () => {
    expect(
      horizontalWinnerOrNull([
        ["x", "o", "x"],
        ["o", "o", "x"],
        [null, null, null],
      ])
    ).toBeNull();
    expect(
      horizontalWinnerOrNull([
        ["x", "o", "x"],
        ["o", "o", "o"],
        ["x", "o", "o"],
      ])
    ).toBeNull();
    expect(
      horizontalWinnerOrNull([
        ["o", "o", "x"],
        ["o", "o", "x"],
        ["x", "x", "o"],
      ])
    ).toBeNull();
  });
  test("returns winner for horizontal wins", () => {
    expect(
      horizontalWinnerOrNull([
        [null, null, null],
        ["o", "o", "o"],
        ["x", "x", "o"],
      ])
    ).toBe("o");
    expect(
      horizontalWinnerOrNull([
        ["o", "o", "o"],
        ["o", "o", "x"],
        ["x", "x", "o"],
      ])
    ).toBe("o");
    expect(
      horizontalWinnerOrNull([
        ["o", "o", "x"],
        ["o", "o", "o"],
        ["x", "x", "o"],
      ])
    ).toBe("o");
    expect(
      horizontalWinnerOrNull([
        ["o", "o", "x"],
        ["o", "o", null],
        ["x", "x", "x"],
      ])
    ).toBe("x");
  });
});

describe("verticalWinnerOrNull", () => {
  test("returns null for non vertical wins", () => {
    expect(
      verticalWinnerOrNull([
        ["o", "o", "x"],
        ["o", "o", "x"],
        ["x", "x", "o"],
      ])
    ).toBeNull();
    expect(
      verticalWinnerOrNull([
        ["x", "o", "o"],
        ["o", "o", "o"],
        ["o", "x", "x"],
      ])
    ).toBeNull();
    expect(
      verticalWinnerOrNull([
        ["o", "o", "x"],
        ["o", "x", "x"],
        ["x", "x", "o"],
      ])
    ).toBeNull();
    expect(
      verticalWinnerOrNull([
        [null, "o", "x"],
        [null, "x", "x"],
        [null, "x", "o"],
      ])
    ).toBeNull();
  });
  test("returns winner for vertical wins", () => {
    expect(
      verticalWinnerOrNull([
        ["o", null, "o"],
        ["o", "o", "x"],
        ["o", "x", "o"],
      ])
    ).toBe("o");
    expect(
      verticalWinnerOrNull([
        ["o", "o", "x"],
        ["o", "o", "x"],
        ["x", "o", "o"],
      ])
    ).toBe("o");
    expect(
      verticalWinnerOrNull([
        ["o", "o", "x"],
        ["o", "o", "x"],
        [null, "x", "x"],
      ])
    ).toBe("x");
    expect(
      verticalWinnerOrNull([
        [null, "o", "x"],
        [null, "o", "x"],
        [null, "x", "x"],
      ])
    ).toBe("x");
  });
});

describe("leftDiagonalWinnerOrNull", () => {
  test("returns null when no upper left diagonal found", () => {
    expect(
      leftDiagonalWinnerOrNull([
        ["x", "o", "x"],
        ["o", "o", "o"],
        ["x", "o", "o"],
      ])
    ).toBeNull();
    expect(
      leftDiagonalWinnerOrNull([
        ["x", "o", "x"],
        ["o", "x", "o"],
        ["x", "o", "o"],
      ])
    ).toBeNull();
    expect(
      leftDiagonalWinnerOrNull([
        [null, "o", "x"],
        ["o", null, "o"],
        ["x", "o", null],
      ])
    ).toBeNull();
  });

  test("returns the winner when left diagonal found", () => {
    expect(
      leftDiagonalWinnerOrNull([
        ["x", "o", "x"],
        ["o", "x", "o"],
        [null, "o", "x"],
      ])
    ).toBe("x");
    expect(
      leftDiagonalWinnerOrNull([
        ["o", "o", "x"],
        ["o", "o", "o"],
        [null, "o", "o"],
      ])
    ).toBe("o");
  });
});

describe("rightDiagonalWinnerOrNull", () => {
  test("returns null when no upper right diagonal found", () => {
    expect(
      rightDiagonalWinnerOrNull([
        ["x", "o", "x"],
        ["o", "o", "o"],
        ["x", "o", "o"],
      ])
    ).toBeNull();
    expect(
      rightDiagonalWinnerOrNull([
        ["x", "o", "o"],
        ["o", "x", "o"],
        ["x", "o", "x"],
      ])
    ).toBeNull();
    expect(
      rightDiagonalWinnerOrNull([
        [null, "o", null],
        ["o", null, "o"],
        [null, "o", null],
      ])
    ).toBeNull();
  });

  test("returns the winner when right diagonal found", () => {
    expect(
      rightDiagonalWinnerOrNull([
        ["x", "o", "x"],
        ["o", "x", "o"],
        ["x", "o", null],
      ])
    ).toBe("x");
    expect(
      rightDiagonalWinnerOrNull([
        ["x", "o", "o"],
        ["o", "o", "o"],
        ["o", "o", "o"],
      ])
    ).toBe("o");
  });
});

describe("isGameOver", () => {
  test("returns the winner when there is one", () => {
    expect(
      isGameOver([
        ["x", "o", "o"],
        ["o", "o", "x"],
        ["o", "o", "x"],
      ])
    ).toBe("o");
    expect(
      isGameOver([
        ["x", "o", "o"],
        ["o", "x", "o"],
        ["o", "o", "x"],
      ])
    ).toBe("x");
    expect(
      isGameOver([
        ["x", "o", "o"],
        ["o", "o", "o"],
        ["o", "x", null],
      ])
    ).toBe("o");
    expect(
      isGameOver([
        ["x", "o", "o"],
        ["o", "o", "o"],
        ["o", "x", "o"],
      ])
    ).toBe("o");
  });

  test("returns true when board is full but there is no winner", () => {
    expect(
      isGameOver([
        ["x", "o", "o"],
        ["o", "o", "x"],
        ["x", "x", "o"],
      ])
    ).toBe(true);
  });

  test("returns false if game play should continue", () => {
    expect(
      isGameOver([
        ["x", "o", "o"],
        ["o", "o", "x"],
        ["x", "x", null],
      ])
    ).toBe(false);
  });
});

describe("switchSymbol", () => {
  test("returns x when given o", () => {
    expect(switchSymbol("o")).toBe("x");
  });
  test("returns o when given x", () => {
    expect(switchSymbol("x")).toBe("o");
  });
});

describe("formatRow", () => {
  test("returns string appropriately spaced", () => {
    expect(formatRow(["x", "x", "x"])).toBe("x | x | x");
    expect(formatRow(["x", "o", "x"])).toBe("x | o | x");
  });
  test("replaces null with space", () => {
    expect(formatRow(["x", null, "x"])).toBe("x |   | x");
    expect(formatRow(["x", "o", null])).toBe("x | o |  ");
  });
});

describe("displayBoard", () => {
  test("should call console.log 2n - 1 times", () => {
    jest.spyOn(console, "log");
    // const spy = jest.spyOn(ticTacs, "formatRow");
    //   jest.mock("../tic-tac-toe/ticTacToe.js");
    //   const formatRow = jest.formatRow.mockReturnValue("x |  | o")
    expect(console.log.mock.calls.length).toBe(0);
    displayBoard([
      ["x", "o", "o"],
      ["o", "o", "x"],
      ["x", "x", null],
    ]);
    expect(console.log.mock.calls.length).toBe(5);
    expect(console.log.mock.calls[1][0]).toBe("---------");
    //   expect(console.log.mock.calls[2][0]).toBe("x |  | o");
    expect(console.log.mock.calls[3][0]).toBe("---------");

    afterEach(() => {
      jest.clearAllMocks();
    });
  });
});
describe("getRow", () => {
  test("should ask for user row input and return their input minus 1", () => {
    const questionIntMock = jest.spyOn(readlineSync, "questionInt");
    questionIntMock.mockReturnValueOnce(2).mockReturnValueOnce(1);

    expect(getRow()).toBe(1);
    expect(getRow()).toBe(0);
    expect(questionIntMock).toHaveBeenCalledTimes(2);
    expect(questionIntMock.mock.calls[0][0].includes("row")).toBe(true);

    afterEach(() => {
      jest.clearAllMocks();
    });
  });
});
describe("getCol", () => {
  test("should ask for user row input and return their input minus 1", () => {
    const questionIntMock = jest.spyOn(readlineSync, "questionInt");
    questionIntMock.mockReturnValueOnce(2).mockReturnValueOnce(1);

    expect(getCol()).toBe(1);
    expect(getCol()).toBe(0);
    expect(questionIntMock).toHaveBeenCalledTimes(2);
    expect(questionIntMock.mock.calls[0][0].includes("col")).toBe(true);

    afterEach(() => {
      jest.clearAllMocks();
    });
  });
});

