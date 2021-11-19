var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
var User = require("./models/User");

passport.serializeUser((user, done) => {
  return done(null, user);
});

passport.deserializeUser((user, done) => {
  return done(null, user);
});
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "634118630570-n3vphf3cnali1pbu0mgknfq8qmgvp6sa.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOne({
        'google.sub': profile.id
      },(err, user) => {
        if(err){
          return cb(err);
        }
        if(!user){
          user = new User({
            name:profile.displayName,
            email: profile.emails[0].value,
            provider:'google',
            google:profile._json
          });
          user.save(function(err) {
            if (err) console.log(err);
            return cb(err, user);
          });
        }else{
          return cb(err, user);
        }
      })
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });
      // console.log(profile);
      // return cb(null, profile);
    }
  )
);