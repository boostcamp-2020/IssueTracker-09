const Milestone = require('../model').Milestone;
const Issue = require('../model').Issue;

module.exports = {
  create: async (body) => {
    try {
      const { title, content, deadline } = body;
      const result = await Milestone.create({
        title,
        content,
        deadline,
        is_opened: true,
      });
      return result;
    } catch (error) {
      return false;
    }
  },
  read: async (body) => {
    try {
      return await Milestone.findAll({
        include: [Issue],
      });
    } catch (error) {
      return false;
    }
  },
};
