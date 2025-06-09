import React from 'react';
import classes from './PageLayout.module.css';

type PageLayoutProps = {
    title: string;
    description?: string | React.ReactNode;
    instructions?: React.ReactNode;
    children: React.ReactNode;
};

export default function PageLayout({
    title,
    description,
    instructions,
    children,
}: PageLayoutProps) {
    return (
        <div>
            <h2>{title}</h2>
            {description && (
                <p className={classes.description}>{description}</p>
            )}
            {instructions && (
                <details className={classes.gameRules}>
                    <summary className={classes.gameRulesHeader}>
                        Game Rules
                    </summary>
                    <div className={classes.gameRulesContent}>
                        {instructions}
                    </div>
                </details>
            )}
            <div>{children}</div>
        </div>
    );
}
