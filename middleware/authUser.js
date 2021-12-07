module.exports = isUserAuthenticated = (req, res, next) => {
  if (req.user) {
    console.log(req.user);
    next();
  } else {
    res.status(401).json({ message: "you must login first" });
    console.log("this is from else");
  }
};
