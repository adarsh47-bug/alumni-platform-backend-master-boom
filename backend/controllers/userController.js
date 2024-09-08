const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc Register a new user
// @route POST /api/users
// @access Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password, accessCode } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      accessCode,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Authenticate user & get token
// @route POST /api/users/login
// @access Public
const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Logout user
// @route POST /api/users/logout
// @access Public
const logoutUser = (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.contactNumber = req.body.contactNumber || user.contactNumber;
      user.bio = req.body.bio || user.bio;

      // Update education
      if (req.body.education) {
        req.body.education.forEach((edu, index) => {
          if (user.education[index]) {
            user.education[index].degree = edu.degree || user.education[index].degree;
            user.education[index].institution = edu.institution || user.education[index].institution;
            user.education[index].year = edu.year || user.education[index].year;
            user.education[index].description = edu.description || user.education[index].description;
            user.education[index].images = edu.images || user.education[index].images;
          } else {
            user.education.push(edu);
          }
        });
      }

      // Similarly handle other array fields like experience
      if (req.body.experience) {
        req.body.experience.forEach((exp, index) => {
          if (user.experience[index]) {
            user.experience[index].position = exp.position || user.experience[index].position;
            user.experience[index].company = exp.company || user.experience[index].company;
            user.experience[index].startDate = exp.startDate || user.experience[index].startDate;
            user.experience[index].endDate = exp.endDate || user.experience[index].endDate;
            user.experience[index].description = exp.description || user.experience[index].description;
          } else {
            user.experience.push(exp);
          }
        });
      }

      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Update user password
// @route PUT /api/users/profile/password
// @access Private
const updateUserPassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user && (await user.matchPassword(req.body.currentPassword))) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.newPassword, salt);
      await user.save();
      res.json({ message: 'Password updated successfully' });
    } else {
      res.status(400).json({ message: 'Current password is incorrect' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Get all alumni
// @route GET /api/users/alumni
// @access Public
const getAllAlumni = async (req, res) => {
  try {
    const alumni = await User.find({ type: 'Alumni' }).select('-password');
    res.json(alumni);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Get all users
// @route GET /api/users
// @access Public
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Connect with a user
// @route PUT /api/users/connect/:id
// @access Private
const connectUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const connectUser = await User.findById(req.params.id);

    if (user && connectUser) {
      if (!user.connections.includes(connectUser._id)) {
        user.connections.push(connectUser._id);
        await user.save();
        res.status(200).json({ message: 'User connected successfully' });
      } else {
        res.status(400).json({ message: 'User already connected' });
      }
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {
  registerUser,
  authUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
  getAllAlumni,
  getAllUsers,
  connectUser,
};
