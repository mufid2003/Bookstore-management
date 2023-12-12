const User = require('../models/User');
const bcrypt = require('bcrypt');

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
  const {
    name,
    username,
    password,
    email,
    role,
    cart,
    orders
  } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        username,
        password,
        email,
        role,
        cart,
        orders
      },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

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
    // You might want to generate and send a token for authentication
    res.status(200).json({
      message: 'Login successful',
      user: {
        _id: user._id,
        username: user.username,
        role: user.role,
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}