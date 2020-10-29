const milestoneService = require('../service/milestone');

module.exports = {
  create: async (req, res) => {
    try {
      const milestone = await milestoneService.create(req.body);
      if (!milestone.error) {
        return res.status(201).json({ milestone: milestone.dataValues });
      }
      return res.status(403).json(milestone.error);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  read: async (req, res) => {
    try {
      const milestone = await milestoneService.read();
      if (!milestone.error) {
        return res.status(200).json({ milestone });
      }
      return res.status(403).json(milestone.error);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  update: async (req, res) => {
    try {
      const milestone = await milestoneService.update(req.params, req.body);
      if (!milestone.error) {
        return res.status(200).json(true);
      }
      return res.status(403).json(milestone.error);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  remove: async (req, res) => {
    try {
      const milestone = await milestoneService.remove(req.params);
      if (!milestone.error) {
        return res.status(200).json(true);
      }
      return res.status(403).json(milestone.error);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
