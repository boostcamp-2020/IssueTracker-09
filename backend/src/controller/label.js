const labelService = require('../service/label');

module.exports = {
  create: async (req, res) => {
    try {
      const result = await labelService.create(req.body);
      if (!result.error) {
        res.status(201).json(result);
      } else {
        res.status(403).json(result.error);
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  read: async (req, res) => {
    try {
      const result = await labelService.read();
      if (!result.error) {
        res.status(200).json(result);
      } else {
        res.status(403).json(result.error);
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  update: async (req, res) => {
    try {
      const result = await labelService.update(req.body);
      if (!result.error) {
        res.status(200).json(result);
      } else {
        res.status(403).json(false);
      }
    } catch (error) {
      res.status(500).json(false);
    }
  },
  remove: async (req, res) => {
    try {
      const result = await labelService.remove(req.params);
      if (!result.error) {
        res.status(200).json(result);
      } else {
        res.status(403).json(false);
      }
    } catch (error) {
      res.status(500).json(false);
    }
  },
};
