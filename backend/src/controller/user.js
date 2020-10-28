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
};
