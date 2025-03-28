const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware.js');
const { getTasks, addTask, updateTask, deleteTask } = require('../controllers/TaskController.js');


router.get('/', protect, getTasks);
router.post('/', protect, addTask);
router.put('/:id', protect, updateTask);
router.delete('/:id', protect, deleteTask);

module.exports = router;