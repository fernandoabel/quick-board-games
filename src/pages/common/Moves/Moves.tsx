import classes from './Moves.module.css';

interface MovesProps {
    enablePreviousNext?: boolean;
    previousDisabled?: boolean;
    nextDisabled?: boolean;
    onPrevious?: () => void;
    onNext?: () => void;
    onReset: () => void;
}

export default function Moves({
    enablePreviousNext = true,
    previousDisabled = false,
    nextDisabled = false,
    onPrevious,
    onNext,
    onReset,
}: MovesProps) {
    return (
        <div className={classes.gameInfo}>
            {enablePreviousNext && (
                <button
                    className={classes.move}
                    onClick={() => onPrevious?.()}
                    disabled={previousDisabled}
                >
                    Previous
                </button>
            )}
            {enablePreviousNext && (
                <button
                    className={classes.move}
                    onClick={() => onNext?.()}
                    disabled={nextDisabled}
                >
                    Next
                </button>
            )}
            <button className={classes.move} onClick={() => onReset()}>
                Restart Game
            </button>
        </div>
    );
}
