const issueService = require('../service/issue');
const control = require('../lib/controller');

module.exports = {
  create: async (req, res) => {
    const { status, result } = await control(
      issueService.create,
      {
        ...req.body,
        ...req.user,
      },
      201
    );

    return res.status(status).json(result);
  },

  remove: async (req, res) => {
    const { status, result } = await control(issueService.remove, req.params);

    return res.status(status).json(result);
  },

  read: async (req, res) => {
    const { status, result } = await control(issueService.read, req.query);

    return res.status(status).json(result);
  },

  updateTitle: async (req, res) => {
    const { status, result } = await control(issueService.updateTitle, {
      ...req.body,
      ...req.params,
    });

    return res.status(status).json(result);
  },

  updateAssignee: async (req, res) => {
    const { status, result } = await control(issueService.updateAssignee, {
      ...req.body,
      ...req.params,
    });

    return res.status(status).json(result);
  },

  updateAssignees: async (req, res) => {
    const { status, result } = await control(issueService.updateAssignees, {
      ...req.body,
      ...req.params,
    });

    return res.status(status).json(result);
  },

  updateLabels: async (req, res) => {
    const { status, result } = await control(issueService.updateLabels, {
      ...req.body,
      ...req.params,
    });

    return res.status(status).json(result);
  },

  updateMilestone: async (req, res) => {
    const { status, result } = await control(issueService.updateMilestone, {
      ...req.body,
      ...req.params,
    });

    return res.status(status).json(result);
  },

  updateState: async (req, res) => {
    const { status, result } = await control(issueService.updateState, {
      ...req.body,
      ...req.params,
    });

    return res.status(status).json(result);
  },

  updateLabel: async (req, res) => {
    const { status, result } = await control(issueService.updateLabel, {
      ...req.body,
      ...req.params,
    });

    return res.status(status).json(result);
  },
};
