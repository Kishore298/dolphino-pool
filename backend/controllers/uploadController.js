const cloudinary = require('../utils/cloudinary');
const fs = require('fs');

// @desc    Upload image to cloudinary
// @route   POST /api/upload
// @access  Private
const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'dolphino',
            use_filename: true,
            resource_type: 'auto'
        });

        let optimizedUrl = result.secure_url;
        if (optimizedUrl.includes('/upload/')) {
            const transformations = result.resource_type === 'video' 
                ? 'q_auto,f_auto,vc_auto,w_1200' 
                : 'q_auto,f_auto,w_1200';
            optimizedUrl = optimizedUrl.replace('/upload/', `/upload/${transformations}/`);
        }

        // Remove file from local storage
        fs.unlinkSync(req.file.path);

        res.json({
            url: optimizedUrl,
            public_id: result.public_id,
            resource_type: result.resource_type
        });
    } catch (error) {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    uploadImage
};
