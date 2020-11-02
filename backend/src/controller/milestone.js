const milestoneService = require('../service/milestone');
const control = require('../lib/controller');

module.exports = {
  create: async (req, res) => {
    const { status, result } = await control(
      milestoneService.create,
      req.body,
      201
    );

    return res.status(status).json(result);
  },

  read: async (req, res) => {
    const { status, result } = await control(milestoneService.read);

    return res.status(status).json(result);
  },

  update: async (req, res) => {
    const { status, result } = await control(milestoneService.update, {
      ...req.body,
      ...req.params,
    });

    return res.status(status).json(result);
  },

  remove: async (req, res) => {
    const { status, result } = await control(
      milestoneService.remove,
      req.params
    );

    return res.status(status).json(result);
  },

  updateState: async (req, res) => {
    try {
      const result = await milestoneService.updateState(req.params);
      if (!result.error) {
        return res.status(200).json(result);
      }
      return res.status(403).json(result.error);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
