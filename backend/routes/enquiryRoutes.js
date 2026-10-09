const express = require('express');
const router = express.Router();
const {
    getEnquiries,
    createEnquiry,
    updateEnquiryStatus,
    deleteEnquiry
} = require('../controllers/enquiryController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getEnquiries)
    .post(createEnquiry);

router.route('/:id')
    .put(protect, updateEnquiryStatus)
    .delete(protect, deleteEnquiry);

module.exports = router;
