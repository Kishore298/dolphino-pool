import { motion } from 'framer-motion';

const HowWeWork = () => {
    const steps = [
        {
            number: '01',
            title: 'Requirement Discussion',
            description: 'We listen to your vision, understand your space, and discuss your specific requirements and budget.'
        },
        {
            number: '02',
            title: 'Site Visit',
            description: 'Our experts visit your location to assess feasibility, take measurements, and analyze site conditions.'
        },
        {
            number: '03',
            title: 'Design & Planning',
            description: 'We create detailed architectural designs, select materials, and finalize the project blueprint.'
        },
        {
            number: '04',
            title: 'Quotation',
            description: 'We provide a transparent, detailed quotation covering all aspects of the construction.'
        },
        {
            number: '05',
            title: 'Construction / Installation',
            description: 'Our skilled team executes the project with precision, using high-quality materials and equipment.'
        },
        {
            number: '06',
            title: 'Handover',
            description: 'We conduct rigorous testing, train you on maintenance, and officially hand over your new space.'
        }
    ];

    return (
        <section className="section-padding bg-gray-50">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-sm font-bold text-secondary uppercase tracking-wider mb-2">Our Process</h2>
                <h3 className="text-2xl md:text-5xl font-bold text-primary mb-4">How We Work</h3>
                <p className="text-gray-600">A systematic, transparent approach ensuring flawless execution from first concept to final splash.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
                {/* Connecting Line for Desktop */}
                <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>
                
                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white p-8 rounded-xl shadow-md border border-gray-100 relative z-10 group hover:border-secondary transition-colors"
                    >
                        <div className="w-16 h-16 rounded-full bg-aqua-light text-secondary flex items-center justify-center text-2xl font-bold mb-6 group-hover:bg-secondary group-hover:text-white transition-colors">
                            {step.number}
                        </div>
                        <h4 className="text-xl md:text-2xl font-bold text-primary mb-3">{step.title}</h4>
                        <p className="text-gray-600 text-base md:text-lg leading-relaxed">{step.description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default HowWeWork;
