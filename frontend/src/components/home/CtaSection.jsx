import { Link } from 'react-router-dom';
import { FaPhoneAlt } from 'react-icons/fa';

const CtaSection = ({ settings }) => {
    return (
        <section className="py-24 bg-primary text-white text-center px-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold mb-6">Ready to Build Your Dream Pool?</h2>
                <p className="text-lg text-gray-300 mb-10">
                    Get in touch with us today for a free consultation and quotation. Let's discuss how we can transform your space.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
                    <Link to="/contact" className="bg-secondary text-white px-8 py-4 rounded-md text-lg font-bold hover:bg-white hover:text-primary transition-colors w-full sm:w-auto">
                        Get a Free Quote
                    </Link>
                    <a href={`tel:${settings?.phone?.replace(/[^0-9+]/g, '') || '+916379388498'}`} className="flex items-center text-white border-2 border-white/30 px-8 py-4 rounded-md text-lg font-bold hover:bg-white/10 transition-colors w-full sm:w-auto justify-center">
                        <FaPhoneAlt className="mr-3" /> Call Us Now
                    </a>
                </div>
            </div>
        </section>
    );
};

export default CtaSection;
