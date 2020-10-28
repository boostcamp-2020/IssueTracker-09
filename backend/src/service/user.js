const { createJWT } = require('../lib/utils/jwt');
const User = require('../model').User;
const { enrollList } = require('../lib/store');

module.exports = {
  gitHubLogin: (user) => {
    try {
      const { id, image, name } = user.dataValues;
      const jwtToken = createJWT(id);
      enrollList(id);

      return { token: jwtToken, image, name };
    } catch (error) {
      return false;
    }
  },
  iOSAppleLogin: async (data) => {
    try {
      const { code, name } = data;
      const [result] = await User.findOrCreate({
        where: { user_code: 'a' + code },
        defaults: {
          user_code: 'a' + code,
          name: name,
        },
      });
      const { id } = result.dataValues;
      const jwtToken = createJWT(id);

      enrollList(id);
      return { token: jwtToken };
    } catch (error) {
      return false;
    }
  },

  getUsers: async () => {
    const users = await User.findAll({ attributes: ['id', 'name', 'image'] });
    return users;
  },

  iOSGithubLogin: async ({ code, name, image }) => {
    try {
      if (!name || !code) {
        return { error: '정보가 부족합니다' };
      }
      const user = await User.findOrCreate({
        where: { user_code: 'g' + code },
        defaults: {
          user_code: 'g' + code,
          name,
          image,
        },
      });

      enrollList(user[0].id);
      return createJWT(user[0].id);
    } catch (error) {
      return error;
    }
  },
};