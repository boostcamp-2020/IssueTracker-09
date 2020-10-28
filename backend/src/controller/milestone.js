const milestoneService = require('../service/milestone');

module.exports = {
  create: async (req, res) => {
    const milestone = await milestoneService.create(req.body);
    if (milestone) {
      return res.status(201).json({ milestone: milestone.dataValues });
    }
    return res.status(403).json(false);
  },

  read: async (req, res) => {
    const milestone = await milestoneService.read();
    if (milestone) {
      return res.status(200).json({ milestone });
    }
    return res.status(403).json(false);
  },
  update: async (req, res) => {
    const milestone = await milestoneService.update(req.body);
    if (milestone) {
      return res.status(200).json(true);
    }
    return res.status(403).json(false);
  },
  remove: async (req, res) => {
    const milestone = await milestoneService.remove(req.body);
    if (milestone) {
      return res.status(200).json(true);
    }
    return res.status(403).json(false);
  },
};
