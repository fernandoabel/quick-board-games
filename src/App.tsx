import { BrowserRouter as Router, Routes, Route } from 'react-router';
import About from './pages/About';
import Games from './pages/Games';
import Home from './pages/Home';
import Layout from './core/Layout';
import './App.css';
import GameRenderer from './pages/games/GameRenderer';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="games" element={<Games />} />
                    {/* Dynamic route for individual games */}
                    <Route path="games">
                        <Route element={<Games />} index />
                        <Route path=":gameId" element={<GameRenderer />} />
                    </Route>
                    {/* Future dynamic routes can be added here */}
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
