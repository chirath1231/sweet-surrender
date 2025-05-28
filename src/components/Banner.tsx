'use client';

import React from 'react';
import styles from './Banner.module.css'; // We'll create this CSS module

const messages = [
    "Welcome!",
    "Summer Sale!",
    "New Arrivals!"
];

const Banner = () => {
    const fullMessage = messages.join('   ★★★   '); // Join messages with a separator

    return (
        <div className={styles.bannerContainer}>
            <div className={styles.scrollingText}>
                {fullMessage}
            </div>
        </div>
    );
};

export default Banner; 