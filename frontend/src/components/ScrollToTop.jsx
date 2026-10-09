import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Skip scroll to top for the home page so the browser preserves
        // the scroll position naturally when navigating back to it.
        if (pathname !== '/') {
            window.scrollTo(0, 0);
        }
    }, [pathname]);

    useEffect(() => {
        // Force the browser to save scroll position as 0,0 right before a refresh occurs.
        // This guarantees that refreshing the page always lands at the top, without
        // breaking the natural "Back" navigation behavior.
        const handleBeforeUnload = () => {
            window.scrollTo(0, 0);
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, []);

    return null;
};

export default ScrollToTop;
