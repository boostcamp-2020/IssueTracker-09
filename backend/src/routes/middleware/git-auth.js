const passport = require('passport');

module.exports = (req, res, next) => {
  passport.authenticate('github', (error, user) => {
    if (error || !user) {
      return res.status(401).json('유효하지 않은 계정입니다');
    }

    req.user = user;

    return next();
  })(req, res, next);
};
