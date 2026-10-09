const multer = require('multer');
const path = require('path');

// Multer config
module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname).toLowerCase();  
        const allowed = ['.jpg', '.jpeg', '.png', '.webp', '.mp4', '.mov', '.avi', '.mkv', '.gif', '.heic', '.heif'];
        if (!allowed.includes(ext)) {
            cb(new Error(`File type ${ext} is not supported`), false);
            return;
        }
        cb(null, true);
    },
});
