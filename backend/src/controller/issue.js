const issueService = require('../service/issue');

module.exports = {
  read: async (req, res) => {
    try {
      const result = await issueService.read();

      if (!result.error) {
        return res.status(200).json(true);
      }
      return res.status(403).json(result.error);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
