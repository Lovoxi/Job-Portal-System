const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createApplication,
  getJobApplications,
  getUserApplications,
  getApplication,
  updateApplicationStatus,
  deleteApplication
} = require('../controllers/ApplicationController');

router.post('/', protect, createApplication);
router.get('/job/:jobId', protect, getJobApplications);
router.get('/me', protect, getUserApplications);
router.get('/:id', protect, getApplication);
router.put('/:id', protect, updateApplicationStatus);
router.delete('/:id', protect, deleteApplication);

module.exports = router;