// routes/jobRoutes.js
const express = require('express');
const router = express.Router();
const jobController = require('../controller/serviceController');

// Create a new job
router.post('/', jobController.createJob);

// Get all jobs
router.get('/', jobController.getAllJobs);

// Get a single job by ID
router.get('/:id', jobController.getJobById);

// Update a job by ID
router.post('/update', jobController.updateJobById);

// Delete a job by ID
router.delete('/:id', jobController.deleteJobById);

module.exports = router;
