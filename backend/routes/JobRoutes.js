const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob,
  getEmployerJobs
} = require('../controllers/JobController');


router.get('/', getJobs);
router.get('/:id', getJob);


router.post('/', protect, createJob);
router.put('/:id', protect, updateJob);
router.get('/employer/me', protect, getEmployerJobs);
router.get('/:id', getJob);

module.exports = router;