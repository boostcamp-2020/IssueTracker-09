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
  get: (req, res) => {},
  update: (req, res) => {},
  remove: (req, res) => {},
};
