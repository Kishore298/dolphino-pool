const Project = require('../models/Project');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
    try {
        const { category, featured, limit } = req.query;
        let query = {};
        
        if (category && category !== 'All') {
            query.category = category;
        }
        
        if (featured === 'true') {
            query.isFeatured = true;
        }

        let projectsQuery = Project.find(query).sort({ createdAt: -1 }).populate('relatedServices', 'name slug');
        
        if (limit) {
            projectsQuery = projectsQuery.limit(parseInt(limit));
        }
        
        const projects = await projectsQuery;
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get project by slug
// @route   GET /api/projects/:slug
// @access  Public
const getProjectBySlug = async (req, res) => {
    try {
        const project = await Project.findOne({ slug: req.params.slug }).populate('relatedServices', 'name slug mainImage shortDescription');
        if (project) {
            res.json(project);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a project
// @route   POST /api/projects
// @access  Private
const createProject = async (req, res) => {
    try {
        const project = new Project(req.body);
        const createdProject = await project.save();
        res.status(201).json(createdProject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after', runValidators: true });
        if (project) {
            res.json(project);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (project) {
            res.json({ message: 'Project removed' });
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProjects,
    getProjectBySlug,
    createProject,
    updateProject,
    deleteProject
};
