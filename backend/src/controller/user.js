const userService = require('../service/user');

module.exports = {
  gitHubLogin: (req, res) => {
    const token = userService.gitHubLogin(req.user);
    if (token) {
      res.status(200).json({ token });
    } else {
      res.status(403).json(false);
    }
  },
};
