const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
require("dotenv").config();
const User = require("../database/model/UserModel");

const GOOGLE_CALLBACK_URL = "http://localhost:5000/api/auth/google/callback";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, cb) => {
      console.log(profile);
      const image = profile._json.picture.replace("s96", "s400");
      const defaultUser = {
        fullName: `${profile.name.givenName} ${profile.name.familyName}`,
        email: profile.emails[0].value,
        givenName: profile.name.givenName,
        // avatar: profile.photos[0].value,
        avatar: image,
        googleId: profile.id,
      };

      let user = await User.findOne({ googleId: profile.id }).catch((err) => {
        console.log("Error signing up", err);
        cb(err, null);
      });

      if (!user) {
        const newUser = await new User(defaultUser);
        await newUser.save();
        user = newUser;
      }

      if (user) {
        return cb(null, user);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
  console.log("userid: " + user.id);
  console.log("serializing");
});

passport.deserializeUser(async (id, cb) => {
  console.log("deserializing");
  const user = await User.findById(id).catch((err) => {
    console.log("Error deserializing", err);
    cb(err, null);
  });

  if (user) cb(null, user);
});
