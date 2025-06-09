import Board from './Board';
import PageLayout from '../../../core/PageLayout';

export default function TicTacToe() {
    return (
        <PageLayout
            title="Tic Tac Toe"
            description="Play Tic Tac Toe against the computer or a friend!"
            instructions={
                <>
                    <h5>Objective</h5>
                    <p>
                        The objective of Tic Tac Toe is to be the first player
                        to get three of your marks in a row, either
                        horizontally, vertically, or diagonally.
                    </p>
                    <h5>How to Play</h5>
                    <p>
                        Players take turns placing their marks (X or O) in the
                        empty squares of the 3x3 grid. The game ends when one
                        player wins or all squares are filled without a winner,
                        resulting in a draw.
                    </p>
                </>
            }
        >
            <Board />
        </PageLayout>
    );
}
