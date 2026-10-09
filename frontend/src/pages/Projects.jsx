import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiMapPin } from 'react-icons/fi';
import api from '../utils/api';
import SEO from '../components/SEO';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const { data } = await api.get('/projects');
                setProjects(data.filter(p => p.isPublished));
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    // Get unique categories for filter
    const categories = ['All', ...new Set(projects.map(p => p.category))];
    
    const filteredProjects = filter === 'All' 
        ? projects 
        : projects.filter(p => p.category === filter);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-gray-200 border-t-secondary rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-24 min-h-screen bg-gray-50 pb-20"
        >
            <SEO title="Our Portfolio" url="/projects" description="Explore some of our most prestigious swimming pool and water feature projects across Tamil Nadu." />
            <div className="bg-navy-900 py-20 px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Portfolio</h1>
                <p className="text-gray-300 max-w-2xl mx-auto">
                    Explore some of our most prestigious swimming pool and water feature projects across Tamil Nadu.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12">
                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                                filter === cat 
                                    ? 'bg-secondary text-white shadow-md' 
                                    : 'bg-white text-gray-600 border border-gray-200 hover:border-secondary hover:text-secondary'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <motion.div 
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {filteredProjects.map((project, index) => (
                        <motion.div 
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            key={project._id}
                            className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <div className="h-72 overflow-hidden relative">
                                <img 
                                    src={project.mainImage || `https://via.placeholder.com/800x600?text=${project.name}`} 
                                    alt={project.name} 
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-white/90 backdrop-blur-sm text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                                        {project.category}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-primary mb-2 line-clamp-1">{project.name}</h3>
                                <div className="flex items-center text-gray-500 text-sm mb-4">
                                    <FiMapPin className="mr-1" /> {project.location}
                                </div>
                                <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                                    {project.description}
                                </p>
                                <Link to={`/projects/${project.slug}`} className="text-secondary font-bold text-sm hover:text-primary transition-colors flex items-center">
                                    View Case Study &rarr;
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
                
                {filteredProjects.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        <p className="text-xl">No projects found for this category.</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Projects;
