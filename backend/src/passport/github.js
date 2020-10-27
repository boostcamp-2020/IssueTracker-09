const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const User = require('../model').User;

module.exports = () => {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
        callbackURL: 'http://localhost:3000/api/user/github/callback',
      },
      async (accessToken, refreshToken, profile, cb) => {
        const data = await User.findOrCreate({
          where: { name: profile.id },
          defaults: {
            name: profile.id,
            image: profile.photos[0].value,
          },
        });

        return cb(null, data[0]);
      }
    )
  );
};
