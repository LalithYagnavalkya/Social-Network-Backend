const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  fullName: String,
  googleId: String,
  avatar: String,
  // thumbnail: String,
  givenName: String,
});

module.exports = mongoose.model("User", userSchema);
