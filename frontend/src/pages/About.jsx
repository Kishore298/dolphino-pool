import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../utils/api';
import WhyChooseUs from '../components/home/WhyChooseUs';

const About = () => {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const { data } = await api.get('/settings');
                setSettings(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-gray-200 border-t-secondary rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-24"
        >
            {/* Page Header */}
            <div className="bg-navy-900 py-20 px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Dolphino</h1>
                <p className="text-gray-300 max-w-2xl mx-auto">
                    Learn about our journey, our mission, and our commitment to creating exceptional aquatic experiences.
                </p>
            </div>

            {/* Content Section */}
            <div className="section-padding bg-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-primary mb-8 border-b pb-4">Our Story</h2>
                    <div className="prose prose-lg text-gray-700 max-w-none">
                        <p className="mb-6 whitespace-pre-wrap">
                            {settings?.aboutContent || 'Dolphino Swimming Pool Construction was founded with a single mission: to design and build the most breathtaking, durable, and technologically advanced swimming pools and water features in Tamil Nadu.\n\nOver the years, we have grown from a small passionate team into a comprehensive aquatic architectural firm, serving residential homeowners, commercial developers, and institutional clients alike.'}
                        </p>
                        
                        <h3 className="text-2xl font-bold text-primary mt-12 mb-6">Our Mission</h3>
                        <p className="mb-6">
                            To transform visions into aquatic reality through innovative design, superior engineering, and uncompromising quality, delivering spaces that inspire, relax, and endure.
                        </p>

                        <h3 className="text-2xl font-bold text-primary mt-12 mb-6">Our Vision</h3>
                        <p className="mb-6">
                            To be the most trusted and recognized name in aquatic architecture and construction across Southern India, setting the industry standard for excellence and customer satisfaction.
                        </p>
                    </div>
                </div>
            </div>

            <WhyChooseUs />
        </motion.div>
    );
};

export default About;
