import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AboutPreview = ({ settings }) => {
    const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 1024 : false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section className="section-padding bg-white relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div 
                    initial={{ opacity: 0, x: isMobile ? 0 : -50, y: isMobile ? 50 : 0 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-sm font-bold text-secondary uppercase tracking-wider mb-2">About Dolphino</h2>
                    <h3 className="text-2xl md:text-5xl font-bold text-primary mb-6">Creating Beautiful Spaces with Water</h3>
                    
                    <div className="text-gray-600 space-y-4 mb-8 text-lg leading-relaxed">
                        <p>
                            {settings?.aboutContent || 'Dolphino Swimming Pool Construction is a premier provider of aquatic solutions based in Tamil Nadu. We specialize in designing and building high-quality swimming pools, mesmerizing fountains, and custom water features for residential and commercial properties.'}
                        </p>
                        <p>
                            With years of expertise, a commitment to quality materials, and a passion for architectural aesthetics, we transform ordinary spaces into extraordinary aquatic experiences.
                        </p>
                    </div>
                </motion.div>
                
                <motion.div 
                    initial={{ opacity: 0, x: isMobile ? 0 : 50, y: isMobile ? 50 : 0 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl z-10 aspect-[4/3]">
                        <img 
                            src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2070&auto=format&fit=crop" 
                            alt="Luxury Pool Construction" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* Decorative element */}
                    <div className="absolute -bottom-6 -right-6 w-4/5 h-4/5 bg-aqua-light rounded-2xl z-0"></div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutPreview;
