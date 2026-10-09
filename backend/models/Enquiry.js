const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    location: {
        type: String,
        required: true
    },
    interestedService: {
        type: String,
        required: true
    },
    message: {
        type: String
    },
    status: {
        type: String,
        enum: ['New', 'Contacted', 'Follow-up', 'Converted', 'Closed'],
        default: 'New'
    }
}, { timestamps: true });

module.exports = mongoose.model('Enquiry', enquirySchema);
