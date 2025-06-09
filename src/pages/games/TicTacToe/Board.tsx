import { useState } from 'react';
import classes from './TicTacToe.module.css';
import Moves from '../../common/Moves/Moves';

function Square({ value, onSquareClick }) {
    return (
        <button className={classes.square} onClick={onSquareClick}>
            {value}
        </button>
    );
}

function Board({ xIsNext, squares, onPlay }) {
    function handleClick(i: number) {
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = 'X';
        } else {
            nextSquares[i] = 'O';
        }
        onPlay(nextSquares);
    }

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = '🏆🏆🏆 Winner: ' + winner;
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    return (
        <>
            <h3 className={classes.status}>{status}</h3>

            {[0, 1, 2].map((row) => (
                <div
                    className={classes.boardRow}
                    key={row}
                    aria-disabled={!!winner}
                >
                    {[0, 1, 2].map((col) => {
                        const idx = row * 3 + col;
                        return (
                            <Square
                                key={idx}
                                value={squares[idx]}
                                onSquareClick={() => handleClick(idx)}
                            />
                        );
                    })}
                </div>
            ))}
        </>
    );
}

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    function resetGame() {
        setHistory([Array(9).fill(null)]);
        setCurrentMove(0);
    }

    return (
        <>
            <div className={classes.game}>
                <div className={classes.gameBoard}>
                    <Board
                        xIsNext={xIsNext}
                        squares={currentSquares}
                        onPlay={handlePlay}
                    />
                </div>
            </div>
            <Moves
                onPrevious={() => jumpTo(currentMove - 1)}
                onNext={() => jumpTo(currentMove + 1)}
                onReset={() => resetGame()}
                previousDisabled={currentMove === 0}
                nextDisabled={currentMove === history.length - 1}
            />
        </>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a];
        }
    }
    return null;
}
