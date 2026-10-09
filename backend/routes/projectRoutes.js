const express = require('express');
const router = express.Router();
const {
    getProjects,
    getProjectBySlug,
    createProject,
    updateProject,
    deleteProject
} = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(getProjects)
    .post(protect, createProject);

router.route('/slug/:slug').get(getProjectBySlug);

router.route('/:id')
    .put(protect, updateProject)
    .delete(protect, deleteProject);

module.exports = router;
