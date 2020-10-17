const makeBoard = (length = 3) => {
    return new Array(length).fill(null).map(new Array(length).fill(null));
}

const isValidPosition = (row, col, board) => {
    if(row < 0 || col < 0 || row >= board.length || col >= board[0].length ) {
        throw Error("Invalid Position");
    }
    return board[row][col] === null;
}

const placeMark = (row, col, sym, board) => {
    board[row][col] = sym;
    return board; 
}

const isGameOver = (board) => {
    
}