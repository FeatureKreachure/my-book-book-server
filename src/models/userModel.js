const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Consider hashing passwords
    interests: {
      type: [String],
      required: false,
    }, // Array of genres or topics the user is interested in
    // You can add more fields as needed
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
