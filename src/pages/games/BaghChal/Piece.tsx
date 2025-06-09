import clsx from 'clsx';
import classes from './Piece.module.css';

export function Piece({ rowIndex, colIndex, type, onClick }) {
    return (
        <div
            key={`${rowIndex}-${colIndex}`}
            className={clsx(classes.piece, type && classes[type])}
            onClick={() => onClick(rowIndex, colIndex)}
        >
            {type === 'tiger' && '🐅'}
            {type === 'goat' && '🐐'}
        </div>
    );
}
