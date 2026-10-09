import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheck, FaChevronRight, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import api from '../utils/api';
import NotFound from './NotFound';
import SEO from '../components/SEO';

const isVideo = (url) => {
    if (!url) return false;
    const lowerUrl = url.toLowerCase();
    return lowerUrl.includes('/video/upload/') || lowerUrl.match(/\.(mp4|mov|avi|mkv)$/);
};

const ProjectDetails = () => {
    const { slug } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const { data } = await api.get(`/projects/slug/${slug}`);
                setProject(data);
            } catch (err) {
                console.error(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-gray-200 border-t-secondary rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error || !project) {
        return <NotFound />;
    }

    const mediaList = [
        project.mainImage,
        ...(project.projectVideos || []),
        ...(project.galleryImages || [])
    ].filter(Boolean);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-24 bg-white pb-20"
        >
            <SEO 
                title={project.name} 
                description={project.description?.substring(0, 160)} 
                url={`/projects/${slug}`} 
            />
            {/* Breadcrumbs */}
            <div className="bg-gray-50 border-b border-gray-200 py-4 mb-8">
                <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center text-sm text-gray-500">
                    <Link to="/" className="hover:text-primary">Home</Link>
                    <FaChevronRight className="mx-2 text-xs" />
                    <Link to="/projects" className="hover:text-primary">Portfolio</Link>
                    <FaChevronRight className="mx-2 text-xs" />
                    <span className="text-secondary font-medium truncate">{project.name}</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    
                    {/* LEFT: Amazon-Style Image Navigator */}
                    <div className="flex flex-col-reverse md:flex-row gap-4 h-fit sticky top-24">
                        {/* Thumbnails list */}
                        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto md:max-h-[600px] w-full md:w-24 shrink-0 custom-scrollbar pb-2 md:pb-0 pr-2">
                            {mediaList.map((media, index) => (
                                <button 
                                    key={index} 
                                    onClick={() => setActiveIndex(index)}
                                    className={`relative w-20 h-20 md:w-full md:h-24 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                                        activeIndex === index ? 'border-secondary shadow-md' : 'border-gray-200 opacity-70 hover:opacity-100 hover:border-gray-300'
                                    }`}
                                >
                                    {isVideo(media) ? (
                                        <div className="w-full h-full bg-black relative">
                                            <video src={media} className="w-full h-full object-cover opacity-60" />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="bg-black/60 rounded-full p-2"><FaCheck className="text-white text-xs opacity-0"/> <span className="absolute text-white text-[10px] font-bold">▶</span></div>
                                            </div>
                                        </div>
                                    ) : (
                                        <img src={media} alt={`Thumbnail ${index}`} className="w-full h-full object-cover" />
                                    )}
                                </button>
                            ))}
                        </div>
                        
                        {/* Main Media View */}
                        <div className="w-full h-[350px] md:h-[600px] bg-gray-50 rounded-2xl overflow-hidden relative border border-gray-100 shadow-sm flex items-center justify-center">
                            {isVideo(mediaList[activeIndex]) ? (
                                <video 
                                    key={activeIndex}
                                    src={mediaList[activeIndex]} 
                                    className="w-full h-full object-cover bg-black" 
                                    autoPlay controls playsInline 
                                />
                            ) : (
                                <img 
                                    key={activeIndex}
                                    src={mediaList[activeIndex]} 
                                    alt="Main view" 
                                    className="w-full h-full object-cover" 
                                />
                            )}
                        </div>
                    </div>

                    {/* RIGHT: Project Details & Information */}
                    <div className="flex flex-col">
                        <div className="mb-6">
                            <span className="inline-block bg-aqua-light text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                                {project.category}
                            </span>
                            <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4 leading-tight">{project.name}</h1>
                            
                            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 border-b border-gray-100 pb-6">
                                <div className="flex items-center">
                                    <FaMapMarkerAlt className="mr-2 text-secondary" /> {project.location}
                                </div>
                                {project.completionDate && (
                                    <div className="flex items-center">
                                        <FaCalendarAlt className="mr-2 text-secondary" /> 
                                        {new Date(project.completionDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Project Overview</h2>
                            <div className="prose text-gray-600 leading-relaxed">
                                <p className="whitespace-pre-wrap">{project.description}</p>
                            </div>
                        </div>
                        
                        {project.scopeOfWork && project.scopeOfWork.length > 0 && (
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-8">
                                <h3 className="text-lg font-bold text-primary mb-4">Scope of Work</h3>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {project.scopeOfWork.map((scope, index) => (
                                        <li key={index} className="flex items-start text-sm">
                                            <div className="mt-1 mr-3 text-secondary shrink-0"><FaCheck size={12} /></div>
                                            <span className="text-gray-700">{scope}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Services Used */}
                        {project.relatedServices && project.relatedServices.length > 0 && (
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-gray-800 mb-4">Services Provided</h3>
                                <div className="flex flex-wrap gap-3">
                                    {project.relatedServices.map(service => (
                                        <Link key={service._id} to={`/services/${service.slug}`} className="group">
                                            <div className="flex items-center p-2 pr-4 bg-white border border-gray-200 rounded-full hover:border-secondary transition-colors shadow-sm">
                                                {service.mainImage && (
                                                    <img src={service.mainImage} alt={service.name} className="w-8 h-8 rounded-full object-cover mr-3" />
                                                )}
                                                <span className="font-medium text-sm text-gray-700 group-hover:text-primary transition-colors">{service.name}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        {/* Call to Action Actions */}
                        <div className="mt-auto pt-6 border-t border-gray-100">
                            <div className="bg-primary text-white rounded-2xl shadow-lg p-6 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary rounded-bl-full opacity-20"></div>
                                <h3 className="text-xl font-bold mb-2 relative z-10">Start Your Project</h3>
                                <p className="text-gray-300 mb-6 relative z-10 text-sm">Ready to transform your space? Get in touch with our experts today.</p>
                                
                                <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                                    <Link to="/contact" className="btn-secondary flex-1 text-center py-3">
                                        Get a Quote
                                    </Link>
                                    <a href="tel:+916379388498" className="btn-outline text-white border-white hover:bg-white hover:text-primary flex-1 text-center py-3">
                                        Call Us Now
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectDetails;
