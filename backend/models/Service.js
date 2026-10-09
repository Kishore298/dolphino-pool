const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
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
        type: String,
        enum: ['Swimming Pools', 'Water Features', 'Recreational Water Features'],
        required: true
    },
    shortDescription: {
        type: String,
        required: true
    },
    detailedDescription: {
        type: String,
        required: true
    },
    features: [{
        type: String
    }],
    benefits: [{
        type: String
    }],
    faq: [{
        question: String,
        answer: String
    }],
    mainImage: {
        type: String,
        required: true // Cloudinary URL
    },
    galleryImages: [{
        type: String // Cloudinary URLs
    }],
    displayOrder: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    seoTitle: String,
    seoDescription: String,
    seoKeywords: String
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
