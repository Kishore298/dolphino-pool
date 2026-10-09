import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaFacebookF, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import api from '../utils/api';

const Footer = () => {
    const [settings, setSettings] = useState({});
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [settingsRes, servicesRes] = await Promise.all([
                    api.get('/settings'),
                    api.get('/services')
                ]);
                setSettings(settingsRes.data);
                setServices(servicesRes.data.filter(s => s.isPublished));
            } catch (error) {
                console.error('Error fetching footer data:', error);
            }
        };
        fetchData();
    }, []);

    const whatsappLink = `https://wa.me/${settings?.whatsapp?.replace(/[^0-9]/g, '') || '916379388498'}`;

    return (
        <footer className="bg-primary text-white pt-16 pb-24 lg:pb-8 relative z-10 mt-auto">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
                    {/* Brand */}
                    <div className="lg:col-span-5 pr-0 lg:pr-12">
                        <img src="/logo.png" alt="Dolphino Logo" className="h-16 object-contain mb-6 bg-white p-2 rounded-lg" />
                        <p className="text-gray-300 mb-6 text-sm md:text-lg leading-relaxed">
                            {settings?.footerContent || 'Professional swimming pool construction and water-feature solutions across Tamil Nadu. Creating beautiful spaces with water.'}
                        </p>
                        <div className="flex space-x-4">
                            {settings?.instagramUrl && (
                                <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-navy-800 flex items-center justify-center hover:bg-secondary transition-colors">
                                    <FaInstagram />
                                </a>
                            )}
                            {settings?.facebookUrl && (
                                <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-navy-800 flex items-center justify-center hover:bg-secondary transition-colors">
                                    <FaFacebookF />
                                </a>
                            )}
                            {settings?.youtubeUrl && (
                                <a href={settings.youtubeUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-navy-800 flex items-center justify-center hover:bg-secondary transition-colors">
                                    <FaYoutube />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-2">
                        <h4 className="text-xl font-bold mb-6 text-white border-b border-navy-800 pb-2 inline-block">Quick Links</h4>
                        <ul className="space-y-3 text-gray-300">
                            <li><Link to="/services" className="hover:text-secondary transition-colors">Our Services</Link></li>
                            <li><Link to="/projects" className="hover:text-secondary transition-colors">Featured Projects</Link></li>
                            <li><Link to="/gallery" className="hover:text-secondary transition-colors">Gallery</Link></li>
                            <li><Link to="/contact" className="hover:text-secondary transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="lg:col-span-2">
                        <h4 className="text-xl font-bold mb-6 text-white border-b border-navy-800 pb-2 inline-block">Our Services</h4>
                        <ul className="space-y-3 text-gray-300">
                            {services.slice(0, 7).map(service => (
                                <li key={service._id}>
                                    <Link to={`/services/${service.slug}`} className="hover:text-secondary transition-colors line-clamp-1" title={service.name}>
                                        {service.name.length > 25 ? service.name.substring(0, 25) + '...' : service.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="lg:col-span-3">
                        <h4 className="text-xl font-bold mb-6 text-white border-b border-navy-800 pb-2 inline-block">Contact Us</h4>
                        <ul className="space-y-4 text-gray-300">
                            <li className="flex items-start">
                                <FaMapMarkerAlt className="mt-1 mr-3 text-secondary flex-shrink-0" />
                                <span>{settings?.address || 'Chennai, Tamil Nadu, India'}</span>
                            </li>
                            <li className="flex items-center">
                                <FaPhoneAlt className="mr-3 text-secondary flex-shrink-0" />
                                <a href={`tel:${settings?.phone?.replace(/[^0-9+]/g, '')}`} className="hover:text-secondary transition-colors">{settings?.phone || '+91 63793 88498'}</a>
                            </li>
                            <li className="flex items-center">
                                <FaEnvelope className="mr-3 text-secondary flex-shrink-0" />
                                <a href={`mailto:${settings?.email}`} className="hover:text-secondary transition-colors">{settings?.email || 'info@dolphino.in'}</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-navy-800 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} {settings?.businessName || 'Dolphino Swimming Pool Construction'}. All rights reserved.</p>
                </div>
            </div>

            {/* Mobile Bottom Action Bar */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 w-full box-border bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-[9999] flex divide-x divide-gray-200" style={{ transform: 'translate3d(0,0,0)', paddingBottom: 'env(safe-area-inset-bottom)' }}>
                <a href={`tel:${settings?.phone?.replace(/[^0-9+]/g, '')}`} className="flex-1 py-4 flex justify-center items-center text-primary font-medium">
                    <FaPhoneAlt className="mr-2" /> Call
                </a>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex-1 py-4 flex justify-center items-center text-green-500 font-medium">
                    <FaWhatsapp className="mr-2" /> WhatsApp
                </a>
                <Link to="/contact" className="flex-1 py-4 flex justify-center items-center bg-primary text-white font-medium">
                    Get Quote
                </Link>
            </div>
        </footer>
    );
};

export default Footer;
