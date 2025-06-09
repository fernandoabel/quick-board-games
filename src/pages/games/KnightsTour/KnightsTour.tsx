import PageLayout from '../../../core/PageLayout';
import Board from './Board';

export default function KnightsTour() {
    return (
        <PageLayout
            title="Knight's Tour"
            description="Move the knight to visit every square on the chessboard exactly once. Can you complete the tour?"
            instructions={
                <>
                    <h5>Objective</h5>
                    <p>
                        The objective of the Knight's Tour is to move the knight
                        to every square on the chessboard exactly once.
                    </p>
                    <h5>How to Play</h5>
                    <p>
                        Click on the squares to move the knight. The knight can
                        jump in an L-shape: two squares in one direction and one
                        square perpendicular, or vice versa.
                    </p>
                </>
            }
        >
            <Board />
        </PageLayout>
    );
}
