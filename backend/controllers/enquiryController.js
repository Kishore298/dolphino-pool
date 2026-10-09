const Enquiry = require('../models/Enquiry');

// @desc    Get all enquiries
// @route   GET /api/enquiries
// @access  Private
const getEnquiries = async (req, res) => {
    try {
        const enquiries = await Enquiry.find().sort({ createdAt: -1 });
        res.json(enquiries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create an enquiry
// @route   POST /api/enquiries
// @access  Public
const createEnquiry = async (req, res) => {
    try {
        const enquiry = new Enquiry(req.body);
        const createdEnquiry = await enquiry.save();
        res.status(201).json(createdEnquiry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update enquiry status
// @route   PUT /api/enquiries/:id
// @access  Private
const updateEnquiryStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, { status }, { returnDocument: 'after' });
        
        if (enquiry) {
            res.json(enquiry);
        } else {
            res.status(404).json({ message: 'Enquiry not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete an enquiry
// @route   DELETE /api/enquiries/:id
// @access  Private
const deleteEnquiry = async (req, res) => {
    try {
        const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
        if (enquiry) {
            res.json({ message: 'Enquiry removed' });
        } else {
            res.status(404).json({ message: 'Enquiry not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getEnquiries,
    createEnquiry,
    updateEnquiryStatus,
    deleteEnquiry
};
