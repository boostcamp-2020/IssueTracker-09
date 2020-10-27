const { createJWT } = require('../utils/jwt');

module.exports = {
  gitHubLogin: (user) => {
    try {
      const userId = user.dataValues.name;

      return createJWT(userId);
    } catch (error) {
      return false;
    }
  },
};
