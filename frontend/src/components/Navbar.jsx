import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import api from '../utils/api';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [settings, setSettings] = useState({});
    const location = useLocation();

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const { data } = await api.get('/settings');
                setSettings(data);
            } catch (error) {
                console.error('Error fetching settings:', error);
            }
        };
        fetchSettings();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'Projects', path: '/projects' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'Contact', path: '/contact' },
    ];

    const whatsappLink = `https://wa.me/${settings?.whatsapp?.replace(/[^0-9]/g, '') || '916379388498'}`;

    return (
        <nav className={`fixed top-0 left-0 right-0 z-[9999] w-full box-border transition-colors duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white/90 backdrop-blur-sm'}`} style={{ transform: 'translate3d(0,0,0)', paddingTop: 'max(env(safe-area-inset-top), 0.75rem)', paddingBottom: '0.75rem' }}>
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <img src="/logo.png" alt="Dolphino Logo" className="h-12 md:h-16 object-contain" />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        <div className="flex space-x-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`font-medium hover:text-secondary transition-colors ${
                                        location.pathname === link.path ? 'text-secondary' : 'text-primary'
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                        
                        <div className="flex items-center space-x-4">
                            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center text-green-500 hover:text-green-600 font-medium">
                                <FaWhatsapp className="mr-2 text-xl" />
                                WhatsApp
                            </a>
                            <Link to="/contact" className="btn-primary py-2 px-4 text-sm">
                                {settings?.ctaText || 'Get a Free Quote'}
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-primary text-2xl focus:outline-none relative z-[1000]">
                            {isOpen ? <FiX /> : <FiMenu />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 z-[999]">
                    <div className="flex flex-col px-4 py-4 space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`font-medium ${
                                    location.pathname === link.path ? 'text-secondary' : 'text-primary'
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
