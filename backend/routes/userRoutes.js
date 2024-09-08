const express = require('express');
const {
  registerUser,
  authUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
  getAllAlumni,
  getAllUsers,
  connectUser,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').post(registerUser); // Register new user
router.post('/login', authUser); // User login
router.post('/logout', logoutUser); // User logout

// User profile management
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/profile/password').put(protect, updateUserPassword);

// Fetch all alumni
router.route('/alumni').get(getAllAlumni);
router.route('/connect').get(getAllUsers); // Fetch all users
router.route('/connect/:id').put(protect, connectUser);

module.exports = router;
