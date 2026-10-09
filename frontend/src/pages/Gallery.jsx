import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import api from '../utils/api';
import SEO from '../components/SEO';

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const { data } = await api.get('/gallery');
                setImages(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchGallery();
    }, []);

    const categories = ['All', 'Swimming Pools', 'FRP Pools', 'Civil Pools', 'Fountains', 'Waterfalls', 'Rain Dance'];
    
    const filteredImages = filter === 'All' 
        ? images 
        : images.filter(img => img.category === filter);

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
            className="pt-24 min-h-screen bg-white pb-20"
        >
            <SEO title="Gallery" url="/gallery" description="A visual showcase of our finest swimming pool and water feature projects." />
            <div className="bg-navy-900 py-20 px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Gallery</h1>
                <p className="text-gray-300 max-w-2xl mx-auto">
                    A visual showcase of our finest work. Quality craftsmanship captured in every frame.
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
                                    : 'bg-gray-50 text-gray-600 border border-gray-200 hover:border-secondary hover:text-secondary'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Fixed Height Grid */}
                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {filteredImages.map((item) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                key={item._id}
                                className="relative rounded-xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-shadow h-64 sm:h-72"
                                onClick={() => setSelectedImage(item)}
                            >
                                {item.mediaType === 'video' ? (
                                    <video 
                                        src={item.imageUrl} 
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                        muted
                                        loop
                                        playsInline
                                        autoPlay
                                    />
                                ) : (
                                    <img 
                                        src={item.imageUrl} 
                                        alt={item.title || item.category} 
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                        loading="lazy"
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                    <span className="text-secondary text-xs font-bold uppercase tracking-wider mb-1">{item.category}</span>
                                    {item.title && <h3 className="text-white font-bold text-lg">{item.title}</h3>}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
                
                {filteredImages.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        <p className="text-xl">No media found for this category.</p>
                    </div>
                )}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-900/95 backdrop-blur-sm p-4 md:p-8"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button 
                            className="absolute top-6 right-6 text-white text-4xl hover:text-secondary transition-colors z-50"
                            onClick={() => setSelectedImage(null)}
                        >
                            <FiX />
                        </button>
                        
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            className="relative max-w-5xl max-h-[90vh] flex flex-col items-center justify-center w-full"
                            style={{ pointerEvents: 'none' }}
                        >
                            {selectedImage.mediaType === 'video' ? (
                                <video 
                                    src={selectedImage.imageUrl} 
                                    className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                                    controls
                                    autoPlay
                                    style={{ pointerEvents: 'auto' }}
                                    onClick={(e) => e.stopPropagation()}
                                />
                            ) : (
                                <img 
                                    src={selectedImage.imageUrl} 
                                    alt={selectedImage.title || selectedImage.category} 
                                    className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                                    style={{ pointerEvents: 'auto' }}
                                    onClick={(e) => e.stopPropagation()}
                                />
                            )}
                            <div className="mt-4 text-center" style={{ pointerEvents: 'auto' }} onClick={(e) => e.stopPropagation()}>
                                <span className="inline-block bg-secondary text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                                    {selectedImage.category}
                                </span>
                                {selectedImage.title && <h3 className="text-white font-bold text-xl">{selectedImage.title}</h3>}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Gallery;
