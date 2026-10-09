import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import api from '../utils/api';
import SEO from '../components/SEO';

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const { data } = await api.get('/services');
                setServices(data.filter(s => s.isPublished));
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-gray-200 border-t-secondary rounded-full animate-spin"></div>
            </div>
        );
    }

    const categories = ['Swimming Pools', 'Water Features', 'Recreational Water Features'];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-24 min-h-screen bg-gray-50 pb-20"
        >
            <SEO title="Our Services" url="/services" description="Explore our comprehensive range of swimming pool construction and custom water feature solutions." />
            <div className="bg-navy-900 py-20 px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Services</h1>
                <p className="text-gray-300 max-w-2xl mx-auto">
                    Explore our comprehensive range of swimming pool construction and custom water feature solutions.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 mt-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div 
                            key={service._id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group flex flex-col h-full"
                        >
                            <div className="h-64 overflow-hidden relative">
                                <img 
                                    src={service.mainImage || `https://via.placeholder.com/800x600?text=${service.name}`} 
                                    alt={service.name} 
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                            <div className="p-8 flex-grow flex flex-col">
                                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-3">{service.name}</h3>
                                <p className="text-gray-600 text-base md:text-lg mb-6 flex-grow">{service.shortDescription}</p>
                                <Link 
                                    to={`/services/${service.slug}`} 
                                    className="btn-outline text-center mt-auto flex items-center justify-center w-full"
                                >
                                    Explore Service <FiArrowRight className="ml-2" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default Services;
