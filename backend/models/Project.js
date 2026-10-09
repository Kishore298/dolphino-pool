const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String, // 'Civil Pool', 'FRP Pool', 'Fountain', 'Waterfall', 'Rain Dance', etc.
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completionDate: {
        type: Date
    },
    scopeOfWork: [{
        type: String
    }],
    mainImage: {
        type: String,
        required: true // Cloudinary URL
    },
    projectVideos: [{
        type: String // Cloudinary Video URLs
    }],
    galleryImages: [{
        type: String // Cloudinary URLs
    }],
    relatedServices: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
    }],
    isFeatured: {
        type: Boolean,
        default: false
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    seoTitle: String,
    seoDescription: String,
    seoKeywords: String
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
