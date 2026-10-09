import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiMapPin } from 'react-icons/fi';

const FeaturedProjects = ({ projects }) => {
    if (!projects || projects.length === 0) return null;

    return (
        <section className="section-padding bg-white">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                <div className="max-w-2xl text-center md:text-left mx-auto md:mx-0 w-full md:w-auto">
                    <h2 className="text-sm font-bold text-secondary uppercase tracking-wider mb-2">Our Portfolio</h2>
                    <h3 className="text-2xl md:text-5xl font-bold text-primary">Featured Projects</h3>
                </div>
                <Link to="/projects" className="btn-outline hidden md:inline-block">
                    View All Projects
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.slice(0, 3).map((project, index) => (
                    <motion.div 
                        key={project._id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group relative rounded-xl overflow-hidden shadow-lg h-[400px]"
                    >
                        <img 
                            src={project.mainImage || `https://via.placeholder.com/800x600?text=${project.name}`} 
                            alt={project.name} 
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                        
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/40 to-transparent"></div>
                        
                        <div className="absolute bottom-0 left-0 w-full p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <span className="inline-block px-3 py-1 bg-secondary text-white text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
                                {project.category}
                            </span>
                            <h4 className="text-2xl md:text-3xl font-bold mb-2 text-white drop-shadow-md">{project.name}</h4>
                            <div className="flex items-center text-gray-300 text-sm mb-4">
                                <FiMapPin className="mr-1" /> {project.location}
                            </div>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <Link to={`/projects/${project.slug}`} className="inline-block text-accent font-medium hover:text-white">
                                    View Project Case Study &rarr;
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
            
            <div className="mt-8 text-center md:hidden">
                <Link to="/projects" className="btn-outline inline-block w-full">
                    View All Projects
                </Link>
            </div>
        </section>
    );
};

export default FeaturedProjects;
