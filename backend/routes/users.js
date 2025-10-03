const express = require('express');
const { authenticateToken, authorize } = require('../middleware/auth');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', authenticateToken, authorize('program_leader', 'principal_lecturer'), userController.getAllUsers);
router.get('/:id', authenticateToken, userController.getUserById);
router.get('/role/:role', authenticateToken, userController.getUsersByRole);
router.post('/', authenticateToken, authorize('program_leader'), userController.createUser);
router.put('/:id', authenticateToken, userController.updateUser);
router.delete('/:id', authenticateToken, authorize('program_leader'), userController.deleteUser);

module.exports = router;