const express = require("express");
const passport = require("passport");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieSession = require("cookie-session");
require("dotenv").config();
const connectDB = require("./database/database");
const api = require("./routes/index");
require("./auth/passportGoogle");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

connectDB();
app.get("/", (req, res) => {
  res.send("hello");
});
app.use("/api", api);

app.listen(process.env.PORT || 5000, () => {
  console.log("http://localhost:5000");
});
