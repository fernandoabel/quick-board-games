import { useState } from 'react';
import { Link } from 'react-router';
import classes from './Sidebar.module.css';

type NavItem = {
    label: string;
    to?: string;
    children?: NavItem[];
};

const navItems: NavItem[] = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    {
        label: 'Games',
        to: '/games',
        children: [
            { label: 'Bagh Chal', to: '/games/bagh-chal' },
            { label: "Knight's tour", to: '/games/knights-tour' },
            { label: 'Tic-Tac-Toe', to: '/games/tic-tac-toe' },
        ],
    },
];

function TreeNav({ items }: { items: NavItem[] }) {
    const [open, setOpen] = useState<{ [key: string]: boolean }>({});

    const handleToggle = (label: string) => {
        setOpen((prev) => ({ ...prev, [label]: !prev[label] }));
    };

    return (
        <ul>
            {items.map((item) => (
                <li key={item.label}>
                    {item.children ? (
                        <>
                            <span
                                style={{
                                    cursor: 'pointer',
                                    userSelect: 'none',
                                }}
                                onClick={() => handleToggle(item.label)}
                            >
                                {open[item.label] ? '▼' : '▶'} {item.label}
                            </span>
                            {open[item.label] && (
                                <TreeNav items={item.children} />
                            )}
                        </>
                    ) : (
                        <Link to={item.to ?? '#'}>{item.label}</Link>
                    )}
                </li>
            ))}
        </ul>
    );
}

export default function Sidebar() {
    return (
        <aside className={classes.sidebar}>
            <nav>
                <TreeNav items={navItems} />
            </nav>
        </aside>
    );
}
