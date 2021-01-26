let readlineSync = require("readline-sync")
/**
 * Takes in an optional length argument and
 * returns a matrix grid of that length filled with null.
 * It should default to length of 3 if no argument is provided.
 * @param {number} length
 * @returns {Array[]}
 */

let makeBoard = (length = 3) => {
  let newArr = []
  for(let i = 0; i < length; i++){
    newArr[i] = []
    for(let j = 0; j < length; j++){
      newArr[i].push(null)
    }
  }
  return newArr
};

/**
 * Takes in a row, column, and board and determines whether or not
 * that space is available to be chosen. If the spaces value is null,
 * it is available.
 *
 * @param {number} row
 * @param {number} col
 * @param {Array[]} board
 * @returns {boolean} Is the position valid.
 */
let isValidPosition = (row, col, board) => {
  if(row >= board.length || col >= board.length || row < 0 || col < 0){
    return false
  } else {
    return board[row][col] === null
  }
};

/**
 * Takes in a row, column, symbol, and board and updates the board to
 * have the symbol at the row / col.
 * Returns the updated board.
 * @param {number} row
 * @param {number} col
 * @param {string} sym
 * @param {Array[]} board
 * @returns {Array[]} Updated board.
 */

let placeMark = (row, col, sym, board) => {
  board[row][col] = sym
  return board
};

/**
 * Takes in a board and returns whether or not the board
 * is completely full.
 *
 * @param {Array[]} board
 * @returns {boolean} isBoardFull ?
 */

let isBoardFull = (board) => {
  for(let i = 0; i < board.length; i++){
    for(let j = 0; j< board.length; j++){
      if(board[i][j] === null){
        return false
      }
    }
  }
  return true
};

/**
 * Takes in a board and determines if there is a
 * horizontal winner. If there is, it should return that winner.
 * Otherwise it should return null.
 *
 * @param {Array[]} board
 * @returns {string|null} Returns either the winner or null.
 */

let horizontalWinnerOrNull = (board) => {
  for(let i = 0; i < board.length; i++){
    if(board[i].every(e => e === board[i][0] && e !== null)){
      return board[i][0]
    }
  }
  return null
};

/**
 * Takes in a board and determines if there is a
 * vertical winner. If there is, it should return that winner.
 * Otherwise it should return null.
 *
 * @param {Array[]} board
 * @returns {string|null} Returns either the winner or null.
 */

let verticalWinnerOrNull = (board) => {
  for(let i = 0; i < board.length; i++){
    let boo = true
    for(let j = 0; j < board.length - 1; j++){
      boo = boo && board[j][i] === board[j+1][i] && board[j][i] !== null
    }
    if(boo === true){
      return board[0][i]
    }
  }
  return null
};

/**
 * Takes in a board and determines if there is a
 * top left down diagonal winner. If there is, it should return that winner.
 * Otherwise it should return null.
 *
 * @param {Array[]} board
 * @returns {string|null} Returns either the winner or null.
 */

let leftDiagonalWinnerOrNull = (board) => {
  for(let i = 0; i < board.length - 1; i++){
    if(board[i][i] !== board[i+1][i+1] || board[i][i] === null){
      return null
    }
  }
  return board[0][0]
};
/**
 * Takes in a board and determines if there is a
 * top right down diagonal winner. If there is, it should return that winner.
 * Otherwise it should return null.
 *
 * @param {Array[]} board
 * @returns {string|null} Returns either the winner or null.
 */

let rightDiagonalWinnerOrNull = (board) => {
  for(let i = 0, j = board.length - 1; i < board.length - 1; i++, j--){
    if(board[i][j] !== board[i+1][j-1] || board[i][j] === null){
      return null
    }
  }
  return board[board.length-1][0]
};

/**
 * Takes in a board and determines wether or not a game
 * is over. If there is a winner return that winner
 * *Hint* Use your winnerOrNull (previous functions) and isBoardFull helper functions
 * to either return the winner, true, or false.
 *
 * @param {Array[]} board
 * @returns {string|boolean} Returns either the winner (truthy),
 * true (which implies a tie), or false (game is NOT over)
 */
let isGameOver = (board) => {
  if(horizontalWinnerOrNull(board)){
    return horizontalWinnerOrNull(board)
  } else if(verticalWinnerOrNull(board)){
    return verticalWinnerOrNull(board)
  } else if(leftDiagonalWinnerOrNull(board)){
    return leftDiagonalWinnerOrNull(board)
  } else if(rightDiagonalWinnerOrNull(board)){
    return rightDiagonalWinnerOrNull(board)
  } else if(isBoardFull(board)){
    return true
  }
  return false
};

/**
 * Takes in a string symbol (either x or o) and returns
 * the opposite.
 * @param {string} sym
 * @returns {string} The opposite symbol
 */
let switchSymbol = (sym) => {
  return sym === "o" ? "x" : "o"
};

/**
 * Takes in a row of the board and returns the elements
 * separated by " | ". If the element is null is should be replaced with " "
 * @param {Array} row
 * @returns {string}
 */

let formatRow = (row) => {
  return row.map(e => e === null ? " " : e).join(" | ")
};

/**
 * Takes in a board and logs it to the console.
 * It should call your formatRow helper function.
 * Each row should be separated by a line of "-". The
 * length of which should be three times the board length.
 *
 * @param {Array[]} board
 * @returns {undefined} displayBoard is only in charge of logging the board to the console.
 */
let displayBoard = (board) => {
  for(let i = 0; i < board.length; i++){
    console.log(formatRow(board[i]))
    let str = "" //not able to use .fill even make new array, values will be replaced
    for(let j = 0; j < board.length; j++){
      j < board.length - 1 ? str += "----" : str += "-"
    }
    if(i < board.length - 1){
      console.log(str)
    }
  }
};


/**
 * Asks user for row input and returns row. Use questionInt
 * @returns {number} row (should be 1 lower than user because people count from 1)
 */

 let getRow = () => {
   let input = readlineSync.questionInt("Please enter row number: ")
   return input - 1
 };

/**
 * Asks user for col input and returns col.
 * @returns {number} col (should be 1 lower than user because people count from 1)
 */

 let getCol = () => {
   let input = readlineSync.questionInt("please enter column number: ")
   return input - 1
 };

/**
 * Takes in a symbol and a board.
 * Uses the symbol to tell the user it's their turn.
 * calls getRow and getCol.
 * checks to see if that position is valid.
 * If the position is not valid, it should tell the user
 * "Invalid Position" and call itself to retake the turn.
 *
 * If the position is valid, it should mark the board
 * appropriately.
 *
 * @param {string} sym Current users symbol
 * @param {Array[]} board
 * @returns {undefined} Should place mark or call itself again.
 */

let takeTurn = (sym, board) => {
  console.log(`${sym} it's your turn!`)
  let row = getRow()
  let col = getCol()
  if(isValidPosition(row, col, board)){
    placeMark(row, col, sym, board)
  } else {
    console.log("Invalid Position")
    takeTurn(sym, board)
  }
};

/**
 * Uses readline-sync's questionInt to find out how many rows / cols it will have. 
 * Because it's a square only one call should be made. 
 * Should create a symbol variable that starts at value "x"
 * Should create a board variable and call makeBoard. 
 * Should create a gameOver variable and initialize it to false. 
 * 
 * while the game is not over it should:
 * display the board 
 * call takeTurn and switchSymbol
 * 
 * if the game is over is should say the symbol that won like: "x is the winner!"
 * If the game is a tie it should say "Tie Game!"
 * update game over to the result of isGameOver 
 * 
 * When the game is over use readline-sync keyInYN method to ask the user 
 * to play gain. 
 * 
 * If they answer "y" play should call itself, otherwise it 
 * should log "Goodnight!"
 * 
 */
let play = () => {
  let input = readlineSync.questionInt("Please enter a number to set the rows/cols size: ")
  let symbol = "x"
  let dataBoard = makeBoard(input)
  let gameOver = false
  while(!gameOver){
    displayBoard(dataBoard)
    symbol = switchSymbol(symbol)
    takeTurn(symbol, dataBoard)
    gameOver = isGameOver(dataBoard)
    if(gameOver === "x" || gameOver === "o"){
      console.log(`${gameOver} is the winner!`)
      gameOver = true
    } else if(gameOver === true){
      console.log("Tie Game!")
    }
  }
  input = readlineSync.keyInYN("Do you want to play again?")
  input ? play() : console.log("Goodnight!")
};

play()


module.exports = {
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
};
