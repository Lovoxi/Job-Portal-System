const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createOrUpdateEmployerProfile,
  getMyEmployerProfile,
  getEmployerProfileByUserId,
  getAllEmployerProfiles,
  deleteEmployerProfile
} = require('../controllers/EmployerController');


router.get('/', getAllEmployerProfiles);
router.get('/user/:userId', getEmployerProfileByUserId);

router.post('/', protect, createOrUpdateEmployerProfile);
router.get('/me', protect, getMyEmployerProfile);
router.delete('/', protect, deleteEmployerProfile);

module.exports = router;