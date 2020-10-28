const comment = require('../service/comment');

module.exports = {
  create: async (req, res) => {
    try {
      const result = await comment.create(req.body);

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
      const result = await comment.remove(req.body);

      if (!result.error) {
        return res.status(200).json(result);
      }
      return res.status(403).json(result.error);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  update: async (req, res) => {
    try {
      const result = await comment.update(req.body);

      if (!result.error) {
        return res.status(200).json(result);
      }
      return res.status(403).json(result.error);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
