const express = require("express");
const router = express.Router();
const User = require("../models/userModel"); // Import the User model

// POST route to add a new user
router.post("/add-user", async (req, res) => {
  try {
    const { firstName, lastName, email, password, isAdmin } = req.body;

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      isAdmin,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: "Error adding user", error: error.message });
  }
});


// GET route to fetch all users
router.get("/all-users", async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.status(200).json(users); // Send the users as JSON response
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
});

module.exports = router;
