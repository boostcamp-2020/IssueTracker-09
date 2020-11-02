const issueService = require('../service/issue');

module.exports = {
  create: async (req, res) => {
    try {
      const result = await issueService.create({ ...req.body, ...req.user });
      if (!result.error) {
        return res.status(201).json(result);
      }
      return res.status(403).json(result.error);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  remove: async (req, res) => {
    try {
      const result = await issueService.remove(req.params);
      if (!result.error) {
        return res.status(200).json(result);
      }
      return res.status(403).json(result.error);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  read: async (req, res) => {
    try {
      const result = await issueService.read();
      if (!result.error) {
        return res.status(200).json(result);
      }
      return res.status(403).json(result.error);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  updateTitle: async (req, res) => {
    try {
      const result = await issueService.updateTitle({
        ...req.body,
        ...req.params,
      });
      if (!result.error) {
        return res.status(200).json(result);
      }
      return res.status(403).json(result.error);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  updateAssignee: async (req, res) => {
    try {
      const result = await issueService.updateAssignee({
        ...req.params,
        ...req.body,
      });

      if (!result.error) {
        return res.status(200).json(result);
      }

      return res.status(403).json(result.error);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  updateMilestone: async (req, res) => {
    try {
      const result = await issueService.updateMilestone({
        ...req.body,
        ...req.params,
      });
      if (!result.error) {
        return res.status(200).json(result);
      }
      return res.status(403).json(result.error);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  updateState: async (req, res) => {
    try {
      const result = await issueService.updateState(req.params);
      if (!result.error) {
        return res.status(200).json(result);
      }
      return res.status(403).json(result.error);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  updateLabel: async (req, res) => {
    try {
      const result = await issueService.updateLabel({
        ...req.params,
        ...req.body,
      });

      if (!result.error) {
        return res.status(200).json(result);
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
