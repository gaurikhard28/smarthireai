import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="not-found-page" style={styles.container}>
            <h1 style={styles.title}>404</h1>
            <p style={styles.message}>Oops! The page you're looking for doesn't exist.</p>
            <Link to="/" style={styles.link}>
                Go Back to Home
            </Link>
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        padding: '50px',
        fontFamily: 'Arial, sans-serif',
    },
    title: {
        fontSize: '72px',
        color: '#ff6b6b',
    },
    message: {
        fontSize: '24px',
        color: '#333',
        marginBottom: '20px',
    },
    link: {
        fontSize: '18px',
        color: '#007bff',
        textDecoration: 'none',
    },
};

export default NotFound;