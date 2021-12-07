const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: String,
  message: String,
  creatorName: String,
  creatorID: String,
  tags: [String],
  image: String,
  time: Number,
  likeCount: [String],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Post", postSchema);
