// routes/bookRoutes.js

const express = require("express");
const Book = require("../models/bookModel");
const User = require("../models/userModel");
const router = express.Router();

// Create a new book
router.post("/", async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).send(book);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Create a new book based on user email
router.post("/email/:email", async (req, res) => {
  const userEmail = req.params.email;

  try {
    // Find the user with the provided email
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Create a new book using the request body and associate it with the user
    const bookData = {
      ...req.body,
      user: user._id, // Set the user field to the user's _id
    };

    const book = new Book(bookData);
    await book.save();
    res.status(201).send(book);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

// Fetch books for a specific user using email in the query string
router.get("/email/:email", async (req, res) => {
  const userEmail = req.params.email; // Get email from the query string

  try {
    // Find the user with the provided email
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Use the user's _id to find the associated books
    const books = await Book.find({ user: user._id });
    res.send(books);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Fetch books for a specific user
router.get("/user/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const books = await Book.find({ user: userId });
    res.send(books);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Fetch paginated books for a specific user
// router.get("/user/:userId", async (req, res) => {
//   const userId = req.params.userId;
//   const page = parseInt(req.query.page) || 1;
//   const pageSize = parseInt(req.query.pageSize) || 5; // Adjust as needed

//   try {
//     // Query for total count and paginated books
//     const [totalCount, books] = await Promise.all([
//       Book.countDocuments({ user: userId }),
//       Book.find({ user: userId })
//         .skip((page - 1) * pageSize)
//         .limit(pageSize),
//     ]);

//     const totalPages = Math.ceil(totalCount / pageSize);

//     res.send({
//       totalCount,
//       totalPages,
//       currentPage: page,
//       pageSize,
//       books,
//     });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// Get all books with optional parameters to populate characters and additional fields
router.get("/", async (req, res) => {
  const { userId, public } = req.query; // Extract userId and public from query parameters
  const query = {};

  // Filter by user ID if provided
  if (userId) {
    query.user = userId;
  }

  // Filter by public status if provided
  if (public) {
    query.public = public === "true"; // Convert public query parameter to boolean
  }

  try {
    const books = await Book.find(query); // Use the constructed query object
    res.send(books);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a book by ID with optional parameters to populate characters and additional fields
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send();
    }
    res.send(book);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a book by ID
router.patch("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!book) {
      return res.status(404).send();
    }
    res.send(book);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a book by ID
router.delete("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).send();
    }
    res.send(book);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
