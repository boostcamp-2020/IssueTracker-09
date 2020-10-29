const issueService = require('../service/issue');

module.exports = {
  create: async (req, res) => {
    try {
      const result = await issueService.create({ ...req.body, ...req.user });
      if (!result.error) {
        return res.status(201).json(result);
      }
      return res.status(403).json(result.error);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  remove: async (req, res) => {
    try {
      const result = await issueService.remove(req.params);
      if (!result.error) {
        return res.status(200).json(result);
      }
      return res.status(403).json(result.error);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  read: async (req, res) => {
    try {
      const result = await issueService.read();
      if (!result.error) {
        return res.status(200).json(result);
      }
      return res.status(403).json(result.error);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
