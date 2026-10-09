const Gallery = require('../models/Gallery');
const cloudinary = require('../utils/cloudinary');

// @desc    Get all gallery images
// @route   GET /api/gallery
// @access  Public
const getGallery = async (req, res) => {
    try {
        const { category, limit } = req.query;
        let query = { isPublished: true };
        
        if (category && category !== 'All') {
            query.category = category;
        }

        let galleryQuery = Gallery.find(query).sort({ displayOrder: 1, createdAt: -1 });
        
        if (limit) {
            galleryQuery = galleryQuery.limit(parseInt(limit));
        }

        const gallery = await galleryQuery;
        res.json(gallery);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add gallery image
// @route   POST /api/gallery
// @access  Private
const addGalleryImage = async (req, res) => {
    try {
        const gallery = new Gallery(req.body);
        const createdGallery = await gallery.save();
        res.status(201).json(createdGallery);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update gallery image
// @route   PUT /api/gallery/:id
// @access  Private
const updateGalleryImage = async (req, res) => {
    try {
        const gallery = await Gallery.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });
        if (gallery) {
            res.json(gallery);
        } else {
            res.status(404).json({ message: 'Gallery image not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete gallery image
// @route   DELETE /api/gallery/:id
// @access  Private
const deleteGalleryImage = async (req, res) => {
    try {
        const gallery = await Gallery.findById(req.params.id);
        if (gallery) {
            // Delete from cloudinary
            if (gallery.publicId) {
                await cloudinary.uploader.destroy(gallery.publicId);
            }
            await gallery.deleteOne();
            res.json({ message: 'Gallery image removed' });
        } else {
            res.status(404).json({ message: 'Gallery image not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getGallery,
    addGalleryImage,
    updateGalleryImage,
    deleteGalleryImage
};
