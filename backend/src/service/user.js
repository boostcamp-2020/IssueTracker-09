const { createJWT } = require('../utils/jwt');

module.exports = {
  gitHubLogin: (user) => {
    try {
      const { id, image, name } = user.dataValues;
      const jwtToken = createJWT(id);
      return { token: jwtToken, image, name };
    } catch (error) {
      return false;
    }
  },
};
