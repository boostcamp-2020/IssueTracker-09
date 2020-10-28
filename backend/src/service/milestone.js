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
  read: async () => {
    try {
      return await Milestone.findAll({
        include: [Issue],
      });
    } catch (error) {
      return false;
    }
  },
  update: async (body) => {
    try {
      const { milestone_id, title, deadline, content } = body;

      return await Milestone.update(
        { title, deadline, content },
        { where: { id: milestone_id } }
      );
    } catch (error) {
      return false;
    }
  },
};
