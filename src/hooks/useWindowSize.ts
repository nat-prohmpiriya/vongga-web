import { useState, useEffect } from 'react';

interface WindowSize {
    width: number;
    height: number;
}

const useWindow = (delay: number = 250): WindowSize => {
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const handleResize = () => {
            clearTimeout(timeoutId);

            timeoutId = setTimeout(() => {
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            }, delay);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timeoutId);
        };
    }, [delay]);

    return windowSize;
};

export default useWindow;