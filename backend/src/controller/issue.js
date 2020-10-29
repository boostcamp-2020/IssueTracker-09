const issueService = require('../service/issue');

module.exports = {
  remove: async (req, res) => {
    try {
      const result = await issueService.remove(req.params);

      if (!result.error) {
        return res.status(200).json(result);
      }
      return res.status(403).json(result.error);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
