import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa';

const TestimonialsSection = ({ testimonials }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!testimonials || testimonials.length === 0) return null;

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prev = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const current = testimonials[currentIndex];

    return (
        <section className="section-padding bg-aqua-light">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-sm font-bold text-secondary uppercase tracking-wider mb-2">Client Testimonials</h2>
                    <h3 className="text-2xl md:text-5xl font-bold text-primary">What Our Customers Say</h3>
                </div>

                <div className="relative bg-white rounded-2xl shadow-xl p-8 md:p-12">
                    <FaQuoteLeft className="absolute top-8 left-8 text-4xl text-gray-100" />
                    
                    <div className="relative z-10 min-h-[200px] flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="text-center"
                            >
                                <div className="flex justify-center mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} className={`mx-1 ${i < current.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                                    ))}
                                </div>
                                <p className="text-gray-700 text-lg md:text-xl italic mb-6 leading-relaxed">
                                    "{current.review}"
                                </p>
                                <div>
                                    <h4 className="font-bold text-primary text-lg">{current.customerName}</h4>
                                    <p className="text-sm text-gray-500">{current.location}</p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {testimonials.length > 1 && (
                        <div className="flex justify-center mt-8 space-x-4">
                            <button onClick={prev} className="w-10 h-10 rounded-full bg-gray-100 hover:bg-secondary hover:text-white flex items-center justify-center transition-colors">
                                <FaChevronLeft />
                            </button>
                            <button onClick={next} className="w-10 h-10 rounded-full bg-gray-100 hover:bg-secondary hover:text-white flex items-center justify-center transition-colors">
                                <FaChevronRight />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
