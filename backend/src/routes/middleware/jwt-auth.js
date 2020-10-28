// Dependencies
const passport = require('passport');
const { checkList } = require('../../lib/store');

module.exports = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, user) => {
    // if (!user || checkList(user.id)) {
    //   return res.status(401).json('로그인 해주시기 바랍니다');
    // }
    if (error) {
      return res.status(401).json(error);
    }

    // 권한 등 체크 가능
    req.user = user;
    return next();
  })(req, res, next);
};
