const milestoneService = require('../service/milestone');

module.exports = {
  create: async (req, res) => {
    try {
      const milestone = await milestoneService.create(req.body);
      if (milestone) {
        return res.status(201).json({ milestone: milestone.dataValues });
      }
      return res.status(403).json(false);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  read: async (req, res) => {
    try {
      const milestone = await milestoneService.read();
      if (milestone) {
        return res.status(200).json({ milestone });
      }
      return res.status(403).json(false);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  update: async (req, res) => {
    try {
      const milestone = await milestoneService.update(req.params, req.body);
      if (milestone) {
        return res.status(200).json(true);
      }
      return res.status(403).json({ error: '수정에 실패했습니다.' });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  remove: async (req, res) => {
    try {
      const milestone = await milestoneService.remove(req.params);
      if (milestone) {
        return res.status(200).json(true);
      }
      return res.status(403).json({ error: '삭제에 실패했습니다.' });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
