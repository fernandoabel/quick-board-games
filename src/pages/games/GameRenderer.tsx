import { useParams } from 'react-router';
import TicTacToe from './TicTacToe/TicTacToe';
import KnightsTour from './KnightsTour/KnightsTour';
import BaghChal from './BaghChal/BaghChal';

const gameComponents: Record<string, React.FC> = {
    'tic-tac-toe': TicTacToe,
    'knights-tour': KnightsTour,
    'bagh-chal': BaghChal,
};

export default function GameRenderer() {
    const { gameId } = useParams<{ gameId: string }>();
    const GameComponent = gameId ? gameComponents[gameId] : undefined;

    if (!GameComponent) {
        return <div style={{ padding: '2rem' }}>Game not found.</div>;
    }

    return <GameComponent />;
}
