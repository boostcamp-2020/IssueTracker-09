const labelService = require('../service/label');

module.exports = {
  create: async (req, res) => {
    try {
      const result = await labelService.create(req.body);
      if (!result.error) {
        return res.status(201).json(result);
      }
      res.status(403).json(result.error);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  read: async (req, res) => {
    try {
      const result = await labelService.read();
      if (!result.error) {
        return res.status(200).json(result);
      }
      return res.status(403).json(result.error);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  update: async (req, res) => {
    try {
      const result = await labelService.update({ ...req.body, ...req.params });
      if (!result.error) {
        return res.status(200).json(result);
      }
      return res.status(403).json(result.error);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  remove: async (req, res) => {
    try {
      const result = await labelService.remove(req.params);
      if (!result.error) {
        return res.status(200).json(result);
      }
      return res.status(403).json(result.error);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
