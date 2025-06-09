import { useCallback, useState } from 'react';
import classes from './KnightsTour.module.css';
import clsx from 'clsx';
import React from 'react';
import Moves from '../../common/Moves/Moves';

function calculateWinner(squares: Array<number | null>) {
    return squares.every((x) => x !== null);
}

function Square({ value, onSquareClick, highlight, isLastMove }) {
    return (
        <button
            className={clsx(
                classes.square,
                highlight && classes.possibleMove,
                isLastMove && classes.lastMove
            )}
            onClick={onSquareClick}
        >
            {value}
        </button>
    );
}

function Board({ turn, squares, lastMoveIndex, onPlay }) {
    const gameMode = Math.sqrt(squares.length);

    const knight_moves = [
        [2, 1],
        [1, 2],
        [-1, 2],
        [-2, 1],
        [-2, -1],
        [-1, -2],
        [1, -2],
        [2, -1],
    ];

    const validKnightMoves = useCallback(
        (currentRow: number, currentCol: number, _idx: any) => {
            return knight_moves.map(([dx, dy]) => {
                const validRow = currentRow + dx;
                const validCol = currentCol + dy;
                const validIdx = validRow * gameMode + validCol;
                return [validRow, validCol, validIdx];
            });
        },
        [gameMode]
    );

    function isValidMove(row, col, idx) {
        // Check if the move is valid: within bounds and not yet visited.
        const rowCheck = 0 <= row && row < gameMode;
        const colCheck = 0 <= col && col < gameMode;
        return rowCheck && colCheck && squares[idx] == null;
    }

    // Returns true if the square at (row, col, idx) is a possible knight move from lastMoveIndex
    function isPossibleKnightMove(row, col, idx) {
        if (turn === 1) {
            // First move: all squares are possible
            return true;
        }
        if (lastMoveIndex == null) return false;
        const lastRow = Math.floor(lastMoveIndex / gameMode);
        const lastCol = lastMoveIndex % gameMode;
        const moves = validKnightMoves(lastRow, lastCol, lastMoveIndex);
        return moves.some(
            ([r, c, i]) =>
                r === row &&
                c === col &&
                i === idx &&
                isValidMove(row, col, idx)
        );
    }

    function handleClick(row: number, col: number, i: number) {
        if (
            squares[i] ||
            !isValidMove(row, col, i) ||
            calculateWinner(squares)
        ) {
            return;
        }
        if (turn !== 1 && !isPossibleKnightMove(row, col, i)) {
            return;
        }
        const nextSquares = squares.slice();
        nextSquares[i] = turn;
        onPlay(nextSquares);
    }

    const winner = calculateWinner(squares);

    return (
        <>
            {Array.from({ length: gameMode }).map((_, row) => (
                <div
                    className={classes.boardRow}
                    key={row}
                    aria-disabled={!!winner}
                >
                    {Array.from({ length: gameMode }).map((_, col) => {
                        const idx = row * gameMode + col;
                        const highlight =
                            !squares[idx] &&
                            isPossibleKnightMove(row, col, idx) &&
                            !winner;
                        return (
                            <Square
                                key={idx}
                                value={squares[idx]}
                                onSquareClick={() => handleClick(row, col, idx)}
                                highlight={highlight}
                                isLastMove={lastMoveIndex === idx && turn > 1}
                            />
                        );
                    })}
                </div>
            ))}
        </>
    );
}

export default function Game() {
    const [gameMode, setGameMode] = useState(5); // Default to 5x5
    const [history, setHistory] = useState([
        Array(gameMode * gameMode).fill(null),
    ]);
    const [currentMove, setCurrentMove] = useState(0);
    // const [lastMoveIndex, setLastMoveIndex] = useState<number | null>(null);
    const gameTurn = currentMove + 1;
    const currentSquares = history[currentMove];
    const gameModeOption = [5, 6, 7, 8, 9];

    const lastMoveIndex = React.useMemo(() => {
        const squares = history[currentMove] || [];
        const maxValue = Math.max(
            ...squares.filter((v) => typeof v === 'number')
        );
        const diffIndex = squares.indexOf(maxValue);
        return diffIndex;
    }, [currentMove, history]);

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    function resetGame(gameModeToReset = gameMode) {
        const newSquares = Array(gameModeToReset * gameModeToReset).fill(null);
        setHistory([newSquares]);
        setCurrentMove(0);
    }

    function selectGameMode(newGameMode) {
        setGameMode(newGameMode);
        resetGame(newGameMode);
    }

    const winner = calculateWinner(currentSquares);

    return (
        <>
            <div className={classes.gameMode}>
                {gameModeOption.map((option) => (
                    <button
                        className={clsx(
                            classes.gameModeOption,
                            option === gameMode && classes.active
                        )}
                        onClick={() => selectGameMode(option)}
                    >
                        {option}x{option}
                    </button>
                ))}
            </div>
            <div className={classes.game}>
                <div className={classes.gameBoard}>
                    <Board
                        turn={gameTurn}
                        squares={currentSquares}
                        lastMoveIndex={lastMoveIndex}
                        onPlay={handlePlay}
                    />
                </div>
                <div className={classes.status}>
                    {winner && `You won! 🏆🏆🏆`}
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
