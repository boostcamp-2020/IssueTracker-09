const labelService = require('../service/label');
const control = require('../lib/controller');

module.exports = {
  create: async (req, res) => {
    const { status, result } = await control(
      labelService.create,
      req.body,
      201
    );

    return res.status(status).json(result);
  },
  read: async (req, res) => {
    const { status, result } = await control(labelService.read);

    return res.status(status).json(result);
  },
  update: async (req, res) => {
    const { status, result } = await control(labelService.update, {
      ...req.body,
      ...req.params,
    });

    return res.status(status).json(result);
  },
  remove: async (req, res) => {
    const { status, result } = await control(labelService.remove, req.params);

    return res.status(status).json(result);
  },
};
