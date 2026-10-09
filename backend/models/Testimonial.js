const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 5
    },
    review: {
        type: String,
        required: true
    },
    customerImage: {
        type: String // Cloudinary URL
    },
    isPublished: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);
