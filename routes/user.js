const router = require("express").Router();
const isUserAuthenticated = require("../middleware/authUser");

router.get("/auth/user", isUserAuthenticated, (req, res) => {
  res.json(req.user);
});

module.exports = router;
