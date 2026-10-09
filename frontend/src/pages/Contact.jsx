import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
import api from '../utils/api';
import SEO from '../components/SEO';

const Contact = () => {
    const [settings, setSettings] = useState(null);
    const [services, setServices] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [settingsRes, servicesRes] = await Promise.all([
                    api.get('/settings'),
                    api.get('/services')
                ]);
                setSettings(settingsRes.data);
                setServices(servicesRes.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            await api.post('/enquiries', data);
            toast.success('Your enquiry has been submitted successfully! We will contact you soon.');
            reset();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to submit enquiry. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const whatsappLink = `https://wa.me/${settings?.whatsapp?.replace(/[^0-9]/g, '') || '916379388498'}`;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-24"
        >
            <SEO title="Contact Us" url="/contact" description="Have a project in mind? Contact Dolphino to discuss your swimming pool and water feature requirements." />
            <div className="bg-navy-900 py-20 px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
                <p className="text-gray-300 max-w-2xl mx-auto">
                    Have a project in mind? Let's discuss your requirements and turn your vision into reality.
                </p>
            </div>

            <div className="section-padding bg-gray-50">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                    
                    {/* Contact Info */}
                    <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-gray-100">
                        <h2 className="text-3xl font-bold text-primary mb-8">Get in Touch</h2>
                        
                        <div className="space-y-8">
                            <div className="flex items-start">
                                <div className="w-12 h-12 bg-aqua-light rounded-full flex items-center justify-center text-secondary text-xl mr-6 flex-shrink-0">
                                    <FaPhoneAlt />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 text-lg mb-1">Phone</h4>
                                    <a href={`tel:${settings?.phone?.replace(/[^0-9+]/g, '')}`} className="text-gray-600 hover:text-secondary text-lg transition-colors">
                                        {settings?.phone || '+91 63793 88498'}
                                    </a>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <div className="w-12 h-12 bg-aqua-light rounded-full flex items-center justify-center text-secondary text-xl mr-6 flex-shrink-0">
                                    <FaWhatsapp />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 text-lg mb-1">WhatsApp</h4>
                                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-secondary text-lg transition-colors">
                                        {settings?.whatsapp || '+91 63793 88498'}
                                    </a>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <div className="w-12 h-12 bg-aqua-light rounded-full flex items-center justify-center text-secondary text-xl mr-6 flex-shrink-0">
                                    <FaEnvelope />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 text-lg mb-1">Email</h4>
                                    <a href={`mailto:${settings?.email}`} className="text-gray-600 hover:text-secondary text-lg transition-colors">
                                        {settings?.email || 'info@dolphino.in'}
                                    </a>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <div className="w-12 h-12 bg-aqua-light rounded-full flex items-center justify-center text-secondary text-xl mr-6 flex-shrink-0">
                                    <FaMapMarkerAlt />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 text-lg mb-1">Location</h4>
                                    <p className="text-gray-600 text-lg">
                                        {settings?.address || 'Chennai, Tamil Nadu, India'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {settings?.googleMapsUrl && (
                            <div className="mt-12 w-full h-64 rounded-xl overflow-hidden shadow-inner">
                                <iframe 
                                    src={settings.googleMapsUrl} 
                                    width="100%" 
                                    height="100%" 
                                    style={{ border: 0 }} 
                                    allowFullScreen="" 
                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Google Maps Location"
                                ></iframe>
                            </div>
                        )}
                    </div>
                    
                    {/* Contact Form */}
                    <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl">
                        <h2 className="text-3xl font-bold text-primary mb-6">Send an Enquiry</h2>
                        
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                                    <input 
                                        type="text" 
                                        className={`w-full px-4 py-2 rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all`}
                                        {...register("name", { required: "Name is required" })} 
                                    />
                                    {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name.message}</span>}
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                                    <input 
                                        type="tel" 
                                        className={`w-full px-4 py-2 rounded-md border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all`}
                                        {...register("phone", { required: "Phone number is required" })} 
                                    />
                                    {errors.phone && <span className="text-red-500 text-xs mt-1">{errors.phone.message}</span>}
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input 
                                        type="email" 
                                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"
                                        {...register("email")} 
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Location/City *</label>
                                    <input 
                                        type="text" 
                                        className={`w-full px-4 py-2 rounded-md border ${errors.location ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all`}
                                        {...register("location", { required: "Location is required" })} 
                                    />
                                    {errors.location && <span className="text-red-500 text-xs mt-1">{errors.location.message}</span>}
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Interested Service *</label>
                                <select 
                                    className={`w-full px-4 py-2 rounded-md border ${errors.interestedService ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all bg-white`}
                                    {...register("interestedService", { required: "Please select a service" })} 
                                >
                                    <option value="">Select a service...</option>
                                    {services.map(s => (
                                        <option key={s._id} value={s.name}>{s.name}</option>
                                    ))}
                                    <option value="Other">Other / General Enquiry</option>
                                </select>
                                {errors.interestedService && <span className="text-red-500 text-xs mt-1">{errors.interestedService.message}</span>}
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message/Requirements</label>
                                <textarea 
                                    rows="3" 
                                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"
                                    {...register("message")} 
                                ></textarea>
                            </div>
                            
                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full btn-primary py-3 text-base mt-2 disabled:opacity-70 flex justify-center items-center"
                            >
                                {isSubmitting ? (
                                    <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                ) : (
                                    "Submit Enquiry"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Contact;
