import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const ServicesSection = ({ services }) => {
    // Group services by category
    const categories = ['Swimming Pools', 'Water Features', 'Recreational Water Features'];

    return (
        <section className="section-padding bg-gray-50">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-sm font-bold text-secondary uppercase tracking-wider mb-2">Our Expertise</h2>
                <h3 className="text-2xl md:text-5xl font-bold text-primary mb-4">Premium Water Solutions</h3>
                <p className="text-gray-600">From concept to completion, we deliver exceptional swimming pools and water features tailored to your unique requirements.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                    <motion.div 
                        key={service._id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
                    >
                        <div className="h-64 overflow-hidden relative">
                            <img 
                                src={service.mainImage || `https://via.placeholder.com/800x600?text=${service.name}`} 
                                alt={service.name} 
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <Link to={`/services/${service.slug}`} className="text-white font-medium flex items-center hover:text-accent">
                                    View Details <FiArrowRight className="ml-2" />
                                </Link>
                            </div>
                        </div>
                        <div className="p-6">
                            <h5 className="text-xl font-bold text-primary mb-3">{service.name}</h5>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{service.shortDescription}</p>
                            <Link to={`/services/${service.slug}`} className="text-secondary font-medium text-sm flex items-center group-hover:text-primary transition-colors">
                                Learn more <FiArrowRight className="ml-1" />
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
            
            <div className="text-center mt-12">
                <Link to="/services" className="btn-primary inline-block">
                    View All Services
                </Link>
            </div>
        </section>
    );
};

export default ServicesSection;
