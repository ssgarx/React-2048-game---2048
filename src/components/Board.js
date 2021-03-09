import React, { useEffect, useState } from "react";

export default function Board(props) {
    let matrix = new Array(props.GridSize).fill(0).map(() => new Array(props.GridSize).fill(0));
    const placeRandomNumber = (board) => {
        const blankTiles = getBlankTiles(board);

        const randomTile = blankTiles[Math.floor(Math.random() * blankTiles.length)];
        const randomNumber = randomNumberToAdd();
        board[randomTile[0]][randomTile[1]] = randomNumber;
        return board;
    }
    const getBlankTiles = (gameState) => {
        const blankTiles = [];

        for (let r = 0; r < gameState.length; r++) {
            for (let c = 0; c < gameState[r].length; c++) {
                if (gameState[r][c] === 0) { blankTiles.push([r, c]) }
            }
        }

        return blankTiles;
    }
    const randomNumberToAdd = () => {
        const options = [2, 4];
        const randomNumber = options[Math.floor(Math.random() * options.length)];
        return randomNumber;
    }
    matrix = placeRandomNumber(matrix);
    const [gameState, setGameState] = useState(matrix);
    const [score, setScore] = useState(0);

    const rotateRight = (matrix) => {
        let result = [];

        for (let c = 0; c < matrix.length; c++) {
            let row = [];
            for (let r = matrix.length - 1; r >= 0; r--) {
                row.push(matrix[r][c]);
            }
            result.push(row);
        }

        return result;
    }

    const rotateLeft = (matrix) => {
        let result = [];

        for (let c = matrix.length - 1; c >= 0; c--) {
            let row = [];
            for (let r = matrix.length - 1; r >= 0; r--) {
                row.unshift(matrix[r][c]);
            }
            result.push(row);
        }

        return result;
    }

    const moveRight = (inputBoard) => {
        let board = [];
        let score = 0;

        // Shift all numbers to the right
        for (let r = 0; r < inputBoard.length; r++) {
            let row = [];
            for (let c = 0; c < inputBoard[r].length; c++) {
                let current = inputBoard[r][c];
                (current === 0) ? row.unshift(current) : row.push(current);
            }
            board.push(row);
        }

        // Combine numbers and shift to right
        for (let r = 0; r < board.length; r++) {
            for (let c = board[r].length - 1; c >= 0; c--) {
                if (board[r][c] > 0 && board[r][c] === board[r][c - 1]) {
                    board[r][c] = board[r][c] * 2;
                    board[r][c - 1] = 0;
                    score += board[r][c];
                }
            }
            for (let c = board[r].length - 1; c >= 0; c--) {
                if (board[r][c] === 0 && board[r][c - 1] > 0) {
                    board[r][c] = board[r][c - 1];
                    board[r][c - 1] = 0;
                }
            }

        }
        board = placeRandomNumber(board);
        console.log(board);
        return { board, score };
    }

    const moveLeft = (inputBoard) => {
        let board = [];
        let score = 0;

        // Shift all numbers to the left
        for (let r = 0; r < inputBoard.length; r++) {
            let row = [];
            for (let c = inputBoard[r].length - 1; c >= 0; c--) {
                let current = inputBoard[r][c];
                (current === 0) ? row.push(current) : row.unshift(current);
            }
            board.push(row);
        }

        // Combine numbers and shift to left
        for (let r = 0; r < board.length; r++) {
            for (let c = 0; c < board.length; c++) {
                if (board[r][c] > 0 && board[r][c] === board[r][c + 1]) {
                    board[r][c] = board[r][c] * 2;
                    board[r][c + 1] = 0;
                    score += board[r][c];
                }


            }

            for (let c = 0; c < board.length; c++) {
                if (board[r][c] === 0 && board[r][c + 1] > 0) {
                    board[r][c] = board[r][c + 1];
                    board[r][c + 1] = 0;
                }


            }


        }
        board = placeRandomNumber(board);
        console.log(board);
        return { board, score };
    }
    const moveUp = (inputBoard) => {
        let rotatedRight = rotateRight(inputBoard);
        let board = [];
        let score = 0;

        // Shift all numbers to the right
        for (let r = 0; r < rotatedRight.length; r++) {
            let row = [];
            for (let c = 0; c < rotatedRight[r].length; c++) {
                let current = rotatedRight[r][c];
                (current === 0) ? row.unshift(current) : row.push(current);
            }
            board.push(row);
        }

        // Combine numbers and shift to right
        for (let r = 0; r < board.length; r++) {
            for (let c = board[r].length - 1; c >= 0; c--) {
                if (board[r][c] > 0 && board[r][c] === board[r][c - 1]) {
                    board[r][c] = board[r][c] * 2;
                    board[r][c - 1] = 0;
                    score += board[r][c];
                }
            }
            for (let c = board[r].length - 1; c >= 0; c--) {
                if (board[r][c] === 0 && board[r][c - 1] > 0) {
                    board[r][c] = board[r][c - 1];
                    board[r][c - 1] = 0;
                }
            }
        }

        // Rotate board back upright
        board = rotateLeft(board);
        board = placeRandomNumber(board);
        console.log(board);

        return { board, score };
    }

    const moveDown = (inputBoard) => {
        let rotatedRight = rotateRight(inputBoard);
        let board = [];
        let score = 0;

        // Shift all numbers to the left
        for (let r = 0; r < rotatedRight.length; r++) {
            let row = [];
            for (let c = rotatedRight[r].length - 1; c >= 0; c--) {
                let current = rotatedRight[r][c];
                (current === 0) ? row.push(current) : row.unshift(current);
            }
            board.push(row);
        }

        // Combine numbers and shift to left
        for (let r = 0; r < board.length; r++) {
            for (let c = 0; c < board.length; c++) {
                if (board[r][c] > 0 && board[r][c] === board[r][c + 1]) {
                    board[r][c] = board[r][c] * 2;
                    board[r][c + 1] = 0;
                    score += board[r][c];
                }
            }

            for (let c = 0; c < board.length; c++) {
                if (board[r][c] === 0 && board[r][c + 1] > 0) {
                    board[r][c] = board[r][c + 1];
                    board[r][c + 1] = 0;
                }
            }


        }

        // Rotate board back upright
        board = rotateLeft(board);
        board = placeRandomNumber(board);
        console.log(board);

        return { board, score };
    }


    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [gameState])
    const handleKeyDown = (event) => {
        event.preventDefault();
        if (event.keyCode >= 37 && event.keyCode <= 40) {
            // console.log(gameState);        
            if (event.keyCode == 39) {
                // console.log(gameState);
                setScore(score + moveRight(gameState).score);
                setGameState(moveRight(gameState).board);
            } else if (event.keyCode == 38) {
                // console.log(gameState);
                setScore(score + moveUp(gameState).score);
                setGameState(moveUp(gameState).board);
            } else if (event.keyCode == 40) {
                // console.log(gameState);
                setScore(score + moveDown(gameState).score);
                setGameState(moveDown(gameState).board);
            } else {
                // console.log(gameState);
                setScore(score + moveLeft(gameState).score);
                setGameState(moveLeft(gameState).board);
            }

            console.log("key pressed with keycode", event.keyCode);
        }
    }
    return (
        <>
            <div className="board">
                {gameState.map((row, index) => (
                    <div className="board-row" key={index}>
                        {row.map((cell, index) => (
                            <div className={cell == 0 ? `board-box` : `board-box board-box-high`} key={index}  >{cell > 0 && cell}</div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="score"><h2>Score:- {score}</h2></div>
        </>
    );
}