const { createJWT } = require('../utils/jwt');

module.exports = {
  gitHubLogin: (user) => {
    try {
      const userId = user.dataValues.name;
      console.log(userId);
      return createJWT(userId);
    } catch {
      return false;
    }
  },
};
