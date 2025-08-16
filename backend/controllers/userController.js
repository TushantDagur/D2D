const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {sendResponse} = require('../utils/responseutils')

// Create a new user
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();
    res.status(201).json({ message: "User created successfully", userId: user._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" }); // Use generic message for security
    }

    // 2. Compare provided password with hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" }); // Use generic message for security
    }

    // If we reach here, the user is authenticated.
    // In a real application, this is where you would GENERATE A JWT TOKEN
    // and send it back to the client.
    // Example (requires 'jsonwebtoken' library and a secret key):
    /*
    */
    const token = jwt.sign(
          { userId: user._id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
    if (!user) {
    return sendResponse(res, 400, "Invalid credentials");
    }
    // ...
    sendResponse(res, 200, "Logged in successfully", { userId: user._id , token: token});

  } catch (error) {
    // Log the detailed error for debugging purposes (server-side)
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error during login" });
  }
};

module.exports = {createUser, loginUser}