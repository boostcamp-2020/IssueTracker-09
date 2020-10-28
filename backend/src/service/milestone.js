const Milestone = require('../model').Milestone;
const User = require('../model').User;
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
    const { user_id } = body;
    return await Milestone.findAll({
      include: [User],
      raw: true,
    });
  },
};
