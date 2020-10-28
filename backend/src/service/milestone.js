const Milestone = require('../model').Milestone;
const User = require('../model').User;
const Issue = require('../model').Issue;

module.exports = {
  setMilestone: async (body) => {
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
  getUserMilestone: async (body) => {
    const { user_id } = body;
    return await Milestone.findAll({
      include: [User],
      // attributes:[
      //     "milestone_id",
      //     "title",
      //     "content",
      //     "deadline",
      //     "is_opened"
      // ]
      raw: true,
      where: {
        user_id,
      },
    });
  },
  removeMilestone: async (body) => {},
};
