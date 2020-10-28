const milestoneService = require('../service/milestone');

module.exports = {
  create: async (req, res) => {
    const milestone = await milestoneService.setMilestone(req.body);
    if (milestone) {
      res.status(201).json({ milestone: milestone.dataValues });
    } else {
      res.status(403).json(false);
    }
  },

  read: async (req, res) => {
    const milestone = await milestoneService.getUserMilestone(req.body);
    if (milestone) {
      res.status(200).json({ milestone });
    } else {
      res.status(403).json(false);
    }
  },

  remove: async (req, res) => {
    const milestone = await milestoneService.removeMilestone(req.body);
    if (milestone) {
      res.status(200).json({ milestone });
    } else {
      res.status(403).json(false);
    }
  },

  update: async (req, res) => {
    const milestone = await milestoneService.removeMilestone(req.body);
    if (milestone) {
      res.status(200).json({ milestone });
    } else {
      res.status(403).json(false);
    }
  },
};
