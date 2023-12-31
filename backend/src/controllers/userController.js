const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Controller to list all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to list only one user
exports.getOneUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to add a new user
exports.addUser = async (req, res) => {
  const {
    name,
    username,
    password,
    email,
    role,
    cart,
    orders
  } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    username,
    password: hashedPassword,
    email,
    role,
    cart,
    orders
  });


  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller to update a user
exports.updateUser = async (req, res) => {
  const { id } = req.params;

  // Extract only the fields you want to update
  const {
    name,
    username,
    password,
    email,
    role,
  } = req.body;

  try {
    // Find the existing user
    const existingUser = await User.findById(id);

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update only the specified fields
    existingUser.name = name || existingUser.name;
    existingUser.username = username || existingUser.username;
    existingUser.password = password || existingUser.password;
    existingUser.email = email || existingUser.email;
    existingUser.role = role || existingUser.role;

    // Save the updated user
    const updatedUser = await existingUser.save();

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Controller to delete a user
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//login
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' } // Token expires in 1 hour
    );

    res.status(200).json({
      message: 'Login successful',
      user: {
        _id: user._id,
        username: user.username,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
