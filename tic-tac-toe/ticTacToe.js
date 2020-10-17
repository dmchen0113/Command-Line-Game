/**
 * Takes in an optional length argument and
 * returns a matrix grid of that length filled with null.
 * It should default to length of 3 if no argument is provided.
 * @param {number} length
 * @returns {Array[]}
 */

const makeBoard = () => {};

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
const isValidPosition = () => {};

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

 const placeMark = () => {};

module.exports = {
  makeBoard,
  isValidPosition,
  placeMark,
};
