// routes/userRoutes.js
const mongoose = require("mongoose");
const express = require("express");
const User = require("../models/userModel");
const Book = require("../models/bookModel");
const router = express.Router();
const bcrypt = require("bcryptjs");

// dummy post for testing purposes
router.post("/dummy", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    // Send a response along with the status code
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    // Handle errors and send an error response
    res.status(400).json({ error: error.message });
  }
});

// check user exists
router.post("/exist", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(200).json({ message: "User Exists" });
    } else {
      return res.status(200).json({ message: "User Doesn't Exist" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// Create a new user
router.post("/", async (req, res) => {
  try {
    const { username, email, password, interests } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      interests,
      password: hashedPassword,
    });
    // const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET user by email
router.post("/bymail", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Get a user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a user by ID
router.patch("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a user by ID
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// get books based on UID
router.get("/:userId/books", async (req, res) => {
  const { userId } = req.params;

  try {
    const books = await Book.aggregate([
      // Match documents where the 'user' field matches the provided userId
      { $match: { user: mongoose.Types.ObjectId(userId) } },
      // Lookup data from User collection and join it to the 'user' field
      {
        $lookup: {
          from: "User",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      // Unwind the joined 'user' array to access user details
      { $unwind: "$user" },
      // Optionally, project specific fields from the book and user documents
      {
        $project: {
          _id: 1,
          title: 1,
          author: 1,
          // Other book fields you want to include
          username: "$user.username", // User details from the joined collection
          // Other user fields you want to include
        },
      },
    ]);

    res.status(200).send(books);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
