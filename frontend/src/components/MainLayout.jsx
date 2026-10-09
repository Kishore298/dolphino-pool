import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WaterBubbles from './WaterBubbles';
import FloatingWhatsApp from './FloatingWhatsApp';
import { useEffect } from 'react';

const MainLayout = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className="relative min-h-screen flex flex-col font-sans text-gray-800 bg-white">
            <WaterBubbles />
            <Navbar />
            <main className="flex-grow z-10">
                <Outlet />
            </main>
            <FloatingWhatsApp />
            <Footer />
        </div>
    );
};

export default MainLayout;
