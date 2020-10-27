const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('../model').User;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret',
};

module.exports = () => {
  passport.use(
    new JwtStrategy(options, async function (jwt_payload, done) {
      try {
        const user = await User.findOne({ where: { name: jwt_payload.name } });

        if (user) {
          done(null, user);
        }

        done(null, false);
      } catch (error) {
        done(error, false);
      }
    })
  );
};
