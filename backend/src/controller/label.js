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
      res.status(201).json(result);
    } else {
      res.status(403).json(false);
    }
  },
  update: (req, res) => {},
  remove: (req, res) => {},
};
