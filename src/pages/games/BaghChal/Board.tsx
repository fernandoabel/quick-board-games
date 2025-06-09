import { useState } from 'react';
import classes from './BaghChal.module.css';
import { Piece } from './Piece';
import Moves from '../../common/Moves/Moves';
import clsx from 'clsx';

function Board({
    currentMove,
    boardState,
    gamePhase,
    onGameStateChanged,
    // onPointClicked,
}) {
    const goatIsNext = currentMove % 2 === 0;

    function onPointClick(rowIndex, colIndex) {
        const placeGoat = (row, col) => {
            if (boardState[row][col] === null) {
                const newState = boardState.map((r, rIdx) =>
                    r.map((cell, cIdx) =>
                        rIdx === row && cIdx === col ? 'goat' : cell
                    )
                );
                onGameStateChanged(newState);
            }
        };

        // If the game phase is goat placement, we allow placing goats
        if (gamePhase === 'goat-placement') {
            placeGoat(rowIndex, colIndex);
            if (goatIsNext) {
                //
            } else {
                console.log(
                    'Tigers cannot place goats during placement phase.'
                );
            }
        } else {
            // Handle tiger movement logic here
            console.log(`Tiger moved to (${rowIndex}, ${colIndex})`);
        }
    }

    return (
        <>
            <div className={clsx(classes.gameBoard, classes.boardContainer)}>
                {boardState.flatMap((row, rowIndex) =>
                    row.map((cell, colIndex) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            className={classes.cell}
                        >
                            <Piece
                                type={cell}
                                rowIndex={rowIndex}
                                colIndex={colIndex}
                                onClick={() => {
                                    onPointClick(rowIndex, colIndex);
                                }}
                            />
                        </div>
                    ))
                )}
            </div>

            {/* <div className={classes.goatBench}>
                <div className={classes.goatBenchHeader}>Goat Bench</div>
                <div className={classes.goatBenchContent}>
                    {Array.from({ length: 20 }, (_, idx) => (
                        <div key={`${idx}`}>
                            <Piece
                                key={idx}
                                type="goat"
                                rowIndex={undefined}
                                colIndex={undefined}
                                onClick={undefined}
                            />
                        </div>
                    ))}
                </div>
            </div> */}
        </>
    );
}

const initialBoardState = [
    ['tiger', null, null, null, 'tiger'],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    ['tiger', null, null, null, 'tiger'],
];

export default function Game() {
    const [boardState, setBoardState] = useState(initialBoardState);
    const [currentMove, setCurrentMove] = useState(0);
    const [gamePhase, setGamePhase] = useState('goat-placement'); // 'goat-placement' or 'play'

    const _handlePointClick = (newBoardState) => {
        console.log('newBoardState:', newBoardState);
        setBoardState(newBoardState);
        setCurrentMove((prev) => prev + 1);
        // Check if the game phase should change
        if (gamePhase === 'goat-placement' && currentMove >= 20) {
            setGamePhase('play');
        }
    };

    function resetGame() {
        setBoardState(initialBoardState);
        setGamePhase('goat-placement');
        setCurrentMove(0);
    }

    const winner = true;

    return (
        <>
            <div className={classes.game}>
                <Board
                    boardState={boardState}
                    gamePhase={gamePhase}
                    currentMove={currentMove}
                    onGameStateChanged={_handlePointClick}
                />

                <div className={classes.gameStatus}>
                    {winner && `You won! 🏆🏆🏆`}
                </div>
            </div>
            <Moves enablePreviousNext={false} onReset={() => resetGame()} />
        </>
    );
}
