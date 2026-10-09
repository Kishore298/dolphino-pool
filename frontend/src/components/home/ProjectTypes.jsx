import { motion } from 'framer-motion';

const ProjectTypes = () => {
    const types = [
        { name: 'Homes & Villas', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800&auto=format&fit=crop' },
        { name: 'Farmhouses', image: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=800&auto=format&fit=crop' },
        { name: 'Resorts', image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=800&auto=format&fit=crop' },
        { name: 'Hotels', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop' },
        { name: 'Schools & Institutions', image: 'https://images.unsplash.com/photo-1519451996163-e5e54bb3f13f?q=80&w=800&auto=format&fit=crop' },
        { name: 'Commercial Spaces', image: 'https://images.unsplash.com/photo-1600607688969-a5bfcd64bd40?q=80&w=800&auto=format&fit=crop' }
    ];

    return (
        <section className="section-padding bg-white">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-sm font-bold text-secondary uppercase tracking-wider mb-2">Versatile Solutions</h2>
                <h3 className="text-2xl md:text-5xl font-bold text-primary mb-4">Spaces We Transform</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {types.map((type, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="relative rounded-xl overflow-hidden aspect-square group cursor-pointer"
                    >
                        <img 
                            src={type.image} 
                            alt={type.name} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent flex items-end p-4 md:p-6">
                            <h4 className="text-white font-bold text-lg md:text-xl drop-shadow-md">{type.name}</h4>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default ProjectTypes;
