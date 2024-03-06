const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // hashed passwords
    interests: {
      type: [String],
      required: false,
    }, // Array of genres or topics the user is interested in
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
