const userService = require('../service/user');

module.exports = {
  gitHubLogin: (req, res) => {
    const data = userService.gitHubLogin(req.user);
    if (data.token) {
      res.status(200).json(data);
    } else {
      res.status(403).json(false);
    }
  },
  iOSAppleLogin: async (req, res) => {
    const data = await userService.iOSAppleLogin(req.body);
    console.log(data);
    if (data.token) {
      res.status(200).json(data);
    } else {
      res.status(403).json(false);
    }
  },
  getUser: (req, res) => {
    const { name, image } = req.user.dataValues;
    res.status(200).json({ name, image });
  },
  getUsers: async (req, res) => {
    try {
      const users = await userService.getUsers();

      if (users) {
        return res.status(200).json(users);
      }
      res.status(403).json(false);
    } catch (error) {
      return res.status(500).json({ error });
    }
  },

  iOSGitHubLogin: async (req, res) => {
    try {
      const token = await userService.iOSGithubLogin(req.body);

      if (!token.error) {
        return res.status(201).json({ token });
      }
      return res.status(403).json(token.error);
    } catch (error) {
      return res.status(500).json({ error });
    }
  },

  logout: (req, res) => {
    try {
      userService.logout(req.user);

      return res.status(200).json(true);
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
};
