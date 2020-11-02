const { createJWT } = require('../lib/utils/jwt');
const User = require('../model').User;
const { enrollList, dodgeList } = require('../lib/store');

module.exports = {
  gitHubLogin: (user) => {
    const { id, image, name } = user.dataValues;
    const jwtToken = createJWT(id);
    enrollList(id);

    return { token: jwtToken, image, name };
  },
  iOSAppleLogin: async (data) => {
    const { code, name } = data;
    if (!name || !code) {
      return { error: '정보가 부족합니다' };
    }

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
  },

  getUsers: async () => {
    const users = await User.findAll({ attributes: ['id', 'name', 'image'] });
    return { assignee: users };
  },

  iOSGithubLogin: async ({ code, name, image }) => {
    if (!name || !code) {
      return { error: '정보가 부족합니다' };
    }
    const [user] = await User.findOrCreate({
      where: { user_code: 'g' + code },
      defaults: {
        user_code: 'g' + code,
        name,
        image,
      },
    });

    enrollList(user.id);
    return { token: createJWT(user.id) };
  },

  logout: (user) => {
    dodgeList(user.id);
  },
};
