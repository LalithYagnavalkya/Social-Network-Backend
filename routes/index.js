const router = require("express").Router();
const posts = require("./posts");
const authUser = require("./authUser");
const user = require("./user");

router.use(posts);
router.use(authUser);
router.use(user);

module.exports = router;
