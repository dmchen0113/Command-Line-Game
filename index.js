const readlineSync = require("readline-sync");

const makeBoard = (length = 3) => {
  return new Array(length).fill(null).map((el) => new Array(length).fill(null));
};

const isValidPosition = (row, col, board) => {
  if (row < 0 || col < 0 || row >= board.length || col >= board[0].length) {
    return false;
  }
  return board[row][col] === null;
};

const placeMark = (row, col, sym, board) => {
  board[row][col] = sym;
  return board;
};

const isBoardFull = (board) => {
  return board.every((row) => {
    return row.every((el) => el);
  });
};

const horizontalWinnerOrNull = (board) => {
  let winner = null;
  board.forEach((row) => {
    if (row.every((el) => el === row[0] && el)) {
      winner = row[0];
    }
  });
  return winner;
};

const verticalWinnerOrNull = (board) => {
  let winner = null;
  let newBoard = [];
  for (let i = 0; i < board[0].length; i++) {
    newBoard[i] = [];
    for (let j = 0; j < board.length; j++) {
      newBoard[i].push(board[j][i]);
    }
  }
  return horizontalWinnerOrNull(newBoard);
};

const leftDiagonalWinnerOrNull = (board) => {
  let arr = [];
  for (let i = 0; i < board.length; i++) {
    arr.push(board[i][i]);
  }
  return arr.every((el) => el === arr[0] && el) ? arr[0] : null;
};

const rightDiagonalWinnerOrNull = (board) => {
  let arr = [];
  for (let i = 0; i < board.length; i++) {
    arr.push(board[i][board.length - i - 1]);
  }
  return arr.every((el) => el === arr[0] && el) ? arr[0] : null;
};

const isGameOver = (board) => {
  return (
    horizontalWinnerOrNull(board) ||
    verticalWinnerOrNull(board) ||
    leftDiagonalWinnerOrNull(board) ||
    rightDiagonalWinnerOrNull(board) ||
    isBoardFull(board)
  );
};

const switchSymbol = (sym) => (sym === "x" ? "o" : "x");

const getRow = () => {
    const row = readlineSync.questionInt("What row would you like to choose? \n") - 1;
    return row; 
}

const getCol = () => {
  let col =
    readlineSync.questionInt("What col would you like to choose? \n") - 1;
    return col; 
}

const takeTurn = (sym, board) => {
  console.log(sym + " it's your turn!");
  let row = getRow()
  let col = getCol();
  if (isValidPosition(row, col, board)) {
    placeMark(row, col, sym, board);
  } else {
    console.log("Invalid Position");
    takeTurn(sym, board);
  }
};

const formatRow = (row) => {
    return row.map(el => el || " ").join(" | ")
}

const displayBoard = (board) => {
    board.forEach((row, i) => {
        console.log(formatRow(row))
        if(i !== board.length - 1) {
            console.log("-".repeat(board.length * 3))
        }
    })
}

const play = () => {
 const length = readlineSync.questionInt("How many rows and cols to your board? \n")
  let symbol = "x";
  const board = makeBoard(length);
  let gameOver = false;
  while (!gameOver) {
    displayBoard(board);
    gameOver = isGameOver(board);
    if (gameOver === true) {
      console.log("Tie Game!");
    } else if (gameOver) {
      console.log(gameOver + " is the winner!");
    } else {
      takeTurn(symbol, board);
      symbol = switchSymbol(symbol);
    }
  }

  if (readlineSync.keyInYN("Play Again?")) {
    play();
  } else {
    console.log("Goodnight!");
  }
};

play();
// let testBoard = [
//   ["o", "x", "x"],
//   ["x", "o", "O"],
//   ["x", "o", "x"],
// ];

// console.log(isGameOver(testBoard));
// let board = makeBoard();
// console.log(isValidPosition(0, 0, board));
// console.log(placeMark(0, 0, "x", board));
// console.log(board);
