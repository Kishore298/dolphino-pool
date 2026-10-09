import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaCheck, FaChevronRight } from 'react-icons/fa';
import api from '../utils/api';
import NotFound from './NotFound';
import SEO from '../components/SEO';

const ServiceDetails = () => {
    const { slug } = useParams();
    const [service, setService] = useState(null);
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchService = async () => {
            try {
                const [serviceRes, settingsRes] = await Promise.all([
                    api.get(`/services/${slug}`),
                    api.get('/settings')
                ]);
                setService(serviceRes.data);
                setSettings(settingsRes.data);
            } catch (err) {
                console.error(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchService();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-gray-200 border-t-secondary rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error || !service) {
        return <NotFound />;
    }

    const whatsappMessage = encodeURIComponent(`Hello Dolphino, I am interested in ${service.name}. I would like to discuss my requirement.`);
    const whatsappLink = `https://wa.me/${settings?.whatsapp?.replace(/[^0-9]/g, '') || '916379388498'}?text=${whatsappMessage}`;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-24 bg-white pb-20"
        >
            <SEO 
                title={service.name} 
                description={service.shortDescription || service.detailedDescription?.substring(0, 160)} 
                url={`/services/${slug}`} 
            />
            {/* Breadcrumbs */}
            <div className="bg-gray-50 border-b border-gray-200 py-4">
                <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center text-sm text-gray-500">
                    <Link to="/" className="hover:text-primary">Home</Link>
                    <FaChevronRight className="mx-2 text-xs" />
                    <Link to="/services" className="hover:text-primary">Services</Link>
                    <FaChevronRight className="mx-2 text-xs" />
                    <span className="text-secondary font-medium">{service.name}</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        <img 
                            src={service.mainImage || `https://via.placeholder.com/1200x800?text=${service.name}`} 
                            alt={service.name} 
                            className="w-full h-80 md:h-[500px] object-cover rounded-2xl shadow-lg mb-8"
                        />
                        
                        <div className="mb-6 flex items-center">
                            <span className="bg-aqua-light text-secondary px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                                {service.category}
                            </span>
                        </div>
                        
                        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">{service.name}</h1>
                        
                        <div className="prose prose-lg max-w-none text-gray-700 text-base md:text-lg lg:text-xl leading-relaxed mb-12">
                            <p className="whitespace-pre-wrap">{service.detailedDescription}</p>
                        </div>
                        
                        {/* Features & Benefits */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                            {service.features && service.features.length > 0 && (
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6 border-b pb-2">Key Features</h3>
                                    <ul className="space-y-4">
                                        {service.features.map((feature, index) => (
                                            <li key={index} className="flex items-start text-base md:text-lg">
                                                <div className="mt-1 mr-3 text-secondary"><FaCheck /></div>
                                                <span className="text-gray-700">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            
                            {service.benefits && service.benefits.length > 0 && (
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6 border-b pb-2">Benefits</h3>
                                    <ul className="space-y-4">
                                        {service.benefits.map((benefit, index) => (
                                            <li key={index} className="flex items-start text-base md:text-lg">
                                                <div className="mt-1 mr-3 text-secondary"><FaCheck /></div>
                                                <span className="text-gray-700">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        
                        {/* FAQs */}
                        {service.faq && service.faq.length > 0 && (
                            <div className="mb-12">
                                <h3 className="text-2xl font-bold text-primary mb-6 border-b pb-2">Frequently Asked Questions</h3>
                                <div className="space-y-6">
                                    {service.faq.map((q, index) => (
                                        <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                                            <h4 className="text-lg font-bold text-primary mb-2">{q.question}</h4>
                                            <p className="text-gray-600">{q.answer}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        {/* Gallery Images */}
                        {service.galleryImages && service.galleryImages.length > 0 && (
                            <div>
                                <h3 className="text-2xl font-bold text-primary mb-6 border-b pb-2">Service Gallery</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {service.galleryImages.map((img, index) => (
                                        <img key={index} src={img} alt={`${service.name} ${index + 1}`} className="w-full h-40 md:h-48 object-cover rounded-xl shadow-md cursor-pointer hover:opacity-90 transition-opacity" />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* Sidebar CTA */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-32 bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                            <h3 className="text-2xl font-bold text-primary mb-4">Interested in this service?</h3>
                            <p className="text-gray-600 mb-8">
                                Get a customized quotation and consultation for your {service.name.toLowerCase()} requirement.
                            </p>
                            
                            <div className="space-y-4">
                                <Link to="/contact" className="btn-primary w-full block text-center py-4">
                                    Request a Quote
                                </Link>
                                
                                <a 
                                    href={whatsappLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center w-full bg-green-500 text-white py-4 rounded-md font-bold hover:bg-green-600 transition-colors"
                                >
                                    <FaWhatsapp className="mr-2 text-xl" /> Chat on WhatsApp
                                </a>
                            </div>
                            
                            <div className="mt-8 pt-8 border-t border-gray-100">
                                <h4 className="font-bold text-gray-800 mb-4">Or Call Us Directly</h4>
                                <a href={`tel:${settings?.phone?.replace(/[^0-9+]/g, '')}`} className="text-2xl font-bold text-secondary hover:text-primary transition-colors block text-center">
                                    {settings?.phone || '+91 63793 88498'}
                                </a>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </motion.div>
    );
};

export default ServiceDetails;
