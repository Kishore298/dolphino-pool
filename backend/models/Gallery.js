const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true
    },
    publicId: {
        type: String,
        required: true // For Cloudinary deletion
    },
    title: {
        type: String
    },
    mediaType: {
        type: String,
        enum: ['image', 'video'],
        default: 'image'
    },
    category: {
        type: String, // 'Swimming Pools', 'FRP Pools', 'Civil Pools', 'Fountains', 'Waterfalls', 'Rain Dance'
        required: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    displayOrder: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);
