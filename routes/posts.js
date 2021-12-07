const router = require("express").Router();
const {
  getPosts,
  getSignelPost,
  createPost,
  deletePost,
} = require("../controllers/userPosts");

router.get("/posts", getPosts);

router.get("/getsinglePost/:id", getSignelPost);

router.get("/create", createPost);

router.get("/delete/:id", deletePost);

module.exports = router;
