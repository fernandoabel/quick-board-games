import PageLayout from '../../../core/PageLayout';
import Board from './Board';

const Tiger = ({ children = 'tiger' }) => (
    <strong style={{ color: 'orange' }}>{children}</strong>
);
const Goat = ({ children = 'goat' }) => (
    <strong style={{ color: 'white' }}>{children}</strong>
);

export default function BaghChal() {
    return (
        <PageLayout
            title="BaghChal"
            description={
                <>
                    Play BaghChal, the traditional Nepali board game of tigers
                    and goats. Outsmart your opponent by trapping tigers or
                    capturing goats!
                </>
            }
            instructions={
                <>
                    <h5>Objective</h5>
                    <p>
                        Since forces are unequal, the objective is also
                        different for both sides:
                    </p>
                    <ul>
                        <li>
                            <Goat>Goats</Goat> must surround the four{' '}
                            <Tiger>tigers</Tiger> so that any of them can't make
                            any valid move according to the following rules.
                        </li>
                        <li>
                            <Tiger>Tigers</Tiger> win if they capture five{' '}
                            <Goat>goats</Goat>.
                        </li>
                    </ul>
                    <h5>How the game goes on</h5>
                    <p>
                        Before the start of the game, pieces are placed as
                        follows:
                    </p>
                    <ul>
                        <li>
                            The four <Tiger>tigers</Tiger> are placed in the
                            four corners of the board.
                        </li>
                        <li>
                            The twenty <Goat>goats</Goat> are placed out of the
                            board and will be placed on the board during the
                            game.
                        </li>
                    </ul>
                    <p>
                        Players move alternatively, starting the{' '}
                        <Goat>goats</Goat>. The actions made by{' '}
                        <Goat>goats</Goat> divide the game in two phases:
                    </p>
                    <ul>
                        <li>
                            While all the 20 <Goat>goats</Goat> have not been
                            placed on the board, the only possible move is to
                            place one of them at one of the free junctions of
                            the board.
                        </li>
                        <li>
                            After all the <Goat>goats</Goat> have been placed on
                            the board they may be moved from their position to
                            any adjacent junction following any straight line.
                        </li>
                    </ul>
                    <p>
                        The <Tiger>tigers</Tiger>, during all the game, may
                        perform two kinds of movements:
                    </p>
                    <ul>
                        <li>
                            Same as <Goat>goats</Goat>, they may be moved along
                            any of the lines to an adjacent junction.
                        </li>
                        <li>
                            They also may capture one <Goat>goat</Goat> placed
                            on an adjacent junction by jumping over following a
                            straight line and landing on the next junction
                            adjacent to the position occupied by the{' '}
                            <Goat>goat</Goat>.
                        </li>
                    </ul>
                    <p>
                        Sometimes the game could fall in a repetitive cycle of
                        positions; especially <Goat>goats</Goat> may use this
                        resort to defend themselves from being captured. In
                        order to avoid this kind of situation, an additional
                        rule has been established:
                    </p>
                    <ul>
                        <li>
                            When all the <Goat>goats</Goat> have been placed, it
                            is not allowed to perform any move that causes any
                            situation of the pieces that has been already
                            repeated during the same game.
                        </li>
                    </ul>
                </>
            }
        >
            <Board />
        </PageLayout>
    );
}
