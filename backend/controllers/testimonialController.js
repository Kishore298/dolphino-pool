const Testimonial = require('../models/Testimonial');

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
const getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find({ isPublished: true }).sort({ createdAt: -1 });
        res.json(testimonials);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a testimonial
// @route   POST /api/testimonials
// @access  Private
const createTestimonial = async (req, res) => {
    try {
        const testimonial = new Testimonial(req.body);
        const createdTestimonial = await testimonial.save();
        res.status(201).json(createdTestimonial);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a testimonial
// @route   PUT /api/testimonials/:id
// @access  Private
const updateTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });
        if (testimonial) {
            res.json(testimonial);
        } else {
            res.status(404).json({ message: 'Testimonial not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private
const deleteTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
        if (testimonial) {
            res.json({ message: 'Testimonial removed' });
        } else {
            res.status(404).json({ message: 'Testimonial not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial
};
