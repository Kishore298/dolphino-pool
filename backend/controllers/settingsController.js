const SiteSettings = require('../models/SiteSettings');

// @desc    Get site settings
// @route   GET /api/settings
// @access  Public
const getSettings = async (req, res) => {
    try {
        let settings = await SiteSettings.findOne();
        if (!settings) {
            settings = await SiteSettings.create({});
        }
        res.json(settings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update site settings
// @route   PUT /api/settings
// @access  Private
const updateSettings = async (req, res) => {
    try {
        let settings = await SiteSettings.findOne();
        
        if (settings) {
            settings = await SiteSettings.findOneAndUpdate({}, req.body, { returnDocument: 'after', runValidators: true });
        } else {
            settings = await SiteSettings.create(req.body);
        }
        
        res.json(settings);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getSettings,
    updateSettings
};
