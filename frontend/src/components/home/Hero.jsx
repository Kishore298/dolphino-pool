import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';

const Hero = ({ settings }) => {
    const whatsappLink = `https://wa.me/${settings?.whatsapp?.replace(/[^0-9]/g, '') || '916379388498'}`;

    return (
        <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background Image / Video Mockup */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-navy-900/80 to-navy-900/40 z-10"></div>
                <img 
                    src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2070&auto=format&fit=crop" 
                    alt="Swimming Pool Construction" 
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-8 w-full text-white">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-3xl"
                >
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white drop-shadow-lg">
                        {settings?.heroHeading || 'Swimming Pools & Water Features Designed for Your Space'}
                    </h1>
                    
                    <p className="text-xl md:text-2xl mb-12 text-gray-200 font-light drop-shadow-md">
                        {settings?.heroSubheading || 'Professional swimming pool construction and water-feature solutions across Tamil Nadu.'}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-8">
                        <Link to="/contact" className="btn-primary text-center text-base md:text-lg py-2.5 md:py-3 shadow-lg hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300">
                            {settings?.ctaText || 'Get a Free Quote'}
                        </Link>
                        
                        <Link to="/projects" className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-6 py-2.5 md:py-3 rounded-md text-center text-base md:text-lg font-medium hover:bg-white/20 transition-all duration-300">
                            View Our Projects
                        </Link>
                        
                        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center bg-green-500 text-white px-6 py-2.5 md:py-3 rounded-md text-base md:text-lg font-medium hover:bg-green-600 transition-colors shadow-lg">
                            <FaWhatsapp className="mr-2 text-xl md:text-2xl" /> WhatsApp
                        </a>
                    </div>
                </motion.div>
            </div>
            
            {/* Scroll Indicator */}
            <motion.div 
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-white flex flex-col items-center"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
                <span className="text-sm font-medium tracking-widest uppercase mb-2">Scroll</span>
                <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
                    <div className="w-1.5 h-3 bg-white rounded-full"></div>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
