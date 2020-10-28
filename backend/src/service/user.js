const { createJWT } = require('../utils/jwt');
const User = require('../model').User;

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
  iosAppleLogin: async (data) => {
    try {
      const { code, name } = data;
      const [result] = await User.findOrCreate({
        where: { user_code: code },
        defaults: {
          user_code: code,
          name: name,
        },
      });
      const { id } = result.dataValues;
      const jwtToken = createJWT(id);
      return { token: jwtToken };
    } catch (error) {
      return false;
    }
  },

  getUsers: async () => {
    const users = await User.findAll({ attributes: ['id', 'name', 'image'] });
    return users;
  },
};
