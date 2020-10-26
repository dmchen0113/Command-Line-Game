const { describe, expect, test, beforeEach, afterAll } = require("@jest/globals");
const readlineSync = require("readline-sync");
var rewire = require("rewire");

const TicTac = rewire("../tic-tac-toe/ticTacToe.js");
var {
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
  play,
} = TicTac;

describe("makeBoard", () => {
  test("returns a matrix of a given length", () => {
    expect(makeBoard(4).length).toBe(4);
    expect(makeBoard(4)[0].length).toBe(4);
    expect(makeBoard(2).length).toBe(2);
    expect(makeBoard(2)[0].length).toBe(2);
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
    // see: https://jestjs.io/docs/en/expect.html#tobevalue
    expect(Object.is(returnedBoard, board)).toBe(true)
    expect(returnedBoard[0][0]).toBe("x");
    expect(returnedBoard[2][1]).toBeNull();

    returnedBoard = placeMark(2, 1, "x", returnedBoard);
    expect(returnedBoard[2][1]).toBe("x");
  });
});

describe("isBoardFull", () => {
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
  test("returns null if no horizontal winner", () => {
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
        ["o", "o", "x"],
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
    let logs = [];
    const logMock = jest.fn((...args) => logs.push([...args]));
    TicTac.__set__("console", {
      log: logMock,
    });

    const formatRowMock = jest.fn();
    TicTac.__set__("formatRow", formatRowMock);
    // jest.spyOn(console, "log");
    // expect(logMock).toHaveBeenCalledTimes(0)
    expect(logs.length).toBe(0);
    displayBoard([
      ["x", "o", "o"],
      ["o", "o", "x"],
      ["x", "x", null],
    ]);
    expect(logs.length).toBe(5);
    expect(logs[1][0]).toBe("---------");
    expect(logs[3][0]).toBe("---------");
    expect(formatRowMock).toHaveBeenCalledTimes(3);

    // afterEach(() => {
    //   jest.clearAllMocks();
    // });
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

describe("takeTurn", () => {
    afterAll(() => {
      jest.clearAllMocks();
    });

  let logs = [];
  const logMock = jest.fn((...args) => logs.push([...args]));
  TicTac.__set__("console", {
    log: logMock,
  });
  let isValidPositionMock = jest
    .fn()
    .mockReturnValueOnce(false)
    .mockReturnValueOnce(true);
  var revertIsValidPosition = TicTac.__set__(
    "isValidPosition",
    isValidPositionMock
  );
  let getRowMock = jest.fn().mockImplementation(() => 0);
  let getColMock = jest.fn().mockImplementation(() => 1);
  let placeMarkMock = jest.fn();

  TicTac.__set__("getRow", getRowMock)
  TicTac.__set__("getCol", getColMock)
  TicTac.__set__("placeMark", placeMarkMock)

  let board = [
    ["x", null, null],
    [null, "o", null],
    [null, "x", "o"],
  ];
  takeTurn("x", board );

  test("Tells the user it's their turn with the symbol", () => {
    expect(logs[0][0]).toBe("x it's your turn!");
  });

  test("On invalid input calls itself again", () => {
    expect(logs[1][0]).toBe("Invalid Position");
    expect(logs[2][0]).toBe("x it's your turn!");
    expect(isValidPositionMock).toHaveBeenCalledTimes(2);
  });

  test("On valid input calls placeMark with correct arguments", () => {
      expect(placeMarkMock).toHaveBeenCalledTimes(1);
      expect(placeMarkMock).toHaveBeenCalledWith(0, 1, "x", board)
  })
});

