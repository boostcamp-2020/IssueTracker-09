const labelService = require('../service/label');

module.exports = {
  create: async (req, res) => {
    const result = await labelService.create(req.body);
    if (result) {
      res.status(201).json(true);
    } else {
      res.status(403).json(false);
    }
  },
  get: async (req, res) => {
    const result = await labelService.get(req.user);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(403).json(false);
    }
  },
  update: async (req, res) => {
    const result = await labelService.update(req.body);
    if (result) {
      res.status(200).json(true);
    } else {
      res.status(403).json(false);
    }
  },
  remove: async (req, res) => {
    const result = await labelService.remove(req.params);
    if (result) {
      res.status(200).json(true);
    } else {
      res.status(403).json(false);
    }
  },
};
