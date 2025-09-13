const express = require('express');
const AuthController = require('../controllers/authController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();
const authController = new AuthController();

// Public routes
router.post('/register', (req, res) => authController.register(req, res));
router.post('/login', (req, res) => authController.login(req, res));

// Protected routes (require authentication)
router.get('/profile', authenticateToken, (req, res) => authController.getProfile(req, res));
router.put('/profile', authenticateToken, (req, res) => authController.updateProfile(req, res));
router.put('/change-password', authenticateToken, (req, res) => authController.changePassword(req, res));

// Mock users for development
const mockUsers = [
  {
    id: 1,
    email: 'user@lumen.com',
    password: 'user123',
    name: 'Demo Customer',
    role: 'user'
  },
  {
    id: 2,
    email: 'admin@lumen.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin'
  }
];

// Admin routes
router.get('/users', authenticateToken, requireAdmin, (req, res) => authController.getAllUsers(req, res));
router.put('/users/role', authenticateToken, requireAdmin, (req, res) => authController.updateUserRole(req, res));

module.exports = router;
