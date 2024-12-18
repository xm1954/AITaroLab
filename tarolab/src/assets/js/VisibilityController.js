import React, { useEffect, useState } from 'react';

const VisibilityController = ({ children, delay }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(true);
        }, delay);

        // Clean up the timer on unmount
        return () => clearTimeout(timer);
    }, [delay]);

    return (
        <div style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}>
            {children}
        </div>
    );
};

export default VisibilityController;