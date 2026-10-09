import { FaWhatsapp } from 'react-icons/fa';

const FloatingWhatsApp = () => {
    return (
        <a 
            href="https://wa.me/916379388498" 
            target="_blank" 
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 hover:bg-green-600 transition-all duration-300 flex items-center justify-center animate-bounce"
            aria-label="Chat on WhatsApp"
        >
            <FaWhatsapp className="text-3xl" />
        </a>
    );
};

export default FloatingWhatsApp;
