const commentService = require('../service/comment');
const control = require('../lib/controller');

module.exports = {
  create: async (req, res) => {
    const { status, result } = await control(
      commentService.create,
      { ...req.body, userId: req.user.id },
      201
    );

    return res.status(status).json(result);
  },

  read: async (req, res) => {
    const { status, result } = await control(commentService.read, req.query);

    return res.status(status).json(result);
  },

  readById: async (req, res) => {
    const { status, result } = await control(
      commentService.readById,
      req.params
    );

    return res.status(status).json(result);
  },

  remove: async (req, res) => {
    const { status, result } = await control(commentService.remove, req.params);

    return res.status(status).json(result);
  },

  update: async (req, res) => {
    const { status, result } = await control(commentService.update, {
      ...req.body,
      ...req.params,
    });

    return res.status(status).json(result);
  },
};
