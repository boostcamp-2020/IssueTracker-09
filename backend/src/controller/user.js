const userService = require('../service/user');
const control = require('../lib/controller');

module.exports = {
  gitHubLogin: async (req, res) => {
    await control(userService.gitHubLogin, req.user);

    res.cookie('token', 'helloworld');
    return res.redirect(process.env.CLIENT_URL);
    // return res.status(status).json(result);
  },
  iOSAppleLogin: async (req, res) => {
    const { status, result } = await control(
      userService.iOSAppleLogin,
      req.body
    );

    return res.status(status).json(result);
  },

  getUser: (req, res) => {
    const { name, image } = req.user.dataValues;
    res.status(200).json({ name, image });
  },

  getUsers: async (req, res) => {
    const { status, result } = await control(userService.getUsers);

    return res.status(status).json(result);
  },

  iOSGitHubLogin: async (req, res) => {
    const { status, result } = await control(
      userService.iOSGithubLogin,
      req.body
    );

    return res.status(status).json(result);
  },

  logout: (req, res) => {
    try {
      userService.logout(req.user);

      return res.status(200).json({ response: true });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
};
