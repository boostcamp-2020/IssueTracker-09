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
    const { status, result } = await control(
      milestoneService.updateState,
      req.params
    );

    return res.status(status).json(result);
  },
};
