const posts = require("../database/model/postsModal");

const getPosts = async (req, res) => {
  try {
    const allPosts = await posts.find({});
    res.status(200).json(allPosts);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getSignelPost = async (req, res) => {
  const id = req.params.id;
  try {
    const foundPost = await posts.findById({ _id: id });
    res.status(200).json(foundPost);
  } catch (error) {
    res.status(400).json("cannot find the post");
  }
};

const deletePost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await posts.findByIdAndDelete({ _id: id });
    if (!post) {
      return res.status(400).json({ message: "no post found" });
    }
    res.status(200).json();
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const createPost = async (req, res) => {
  const { creator, title, message, tags, creatorId, desc, creatorName, image } =
    req.body;
  const time = Date.now();
  try {
    const newPost = await new posts({
      creator,
      title,
      message,
      time,
      image,
      creatorId,
      desc,
      creatorName,
    });
    await posts.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
module.exports = {
  getPosts,
  getSignelPost,
  deletePost,
  createPost,
  deletePost,
};
