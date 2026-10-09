import { motion } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';

const WhyChooseUs = () => {
    const reasons = [
        "Custom Pool Designs Tailored to Your Space",
        "High-Quality Materials & Equipment",
        "Professional Execution & Project Management",
        "Complete End-to-End Project Support",
        "Expertise in Residential & Commercial Projects",
        "Meticulous Attention to Finishing"
    ];

    return (
        <section className="py-20 px-4 md:px-8 bg-navy-900 text-white relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/50 to-transparent opacity-50 z-0"></div>
            
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-sm font-bold text-accent uppercase tracking-wider mb-2">The Dolphino Advantage</h2>
                        <h3 className="text-2xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">Why Choose Dolphino for Your Project?</h3>
                        <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                            We bring technical expertise, architectural sensibility, and unwavering dedication to every project, ensuring your water feature or swimming pool is built to perfection and stands the test of time.
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {reasons.map((reason, index) => (
                                <motion.div 
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className="flex items-start space-x-3"
                                >
                                    <FiCheckCircle className="text-accent text-xl mt-1 flex-shrink-0" />
                                    <span className="text-gray-200 font-medium">{reason}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <img src="https://images.unsplash.com/photo-1560624052-449f5ddf0c31?q=80&w=1000&auto=format&fit=crop" alt="Quality Construction" className="w-full h-48 md:h-64 object-cover rounded-xl mt-8" />
                            <img src="https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=1000&auto=format&fit=crop" alt="Premium Finish" className="w-full h-48 md:h-64 object-cover rounded-xl mb-8" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
