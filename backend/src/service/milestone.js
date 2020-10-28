const Milestone = require('../model').Milestone;
const Issue = require('../model').Issue;

module.exports = {
  create: async ({ title, content, deadline }) => {
    if (!title || !content || deadline) {
      return { error: '정보가 부족합니다.' };
    }
    const result = await Milestone.create({
      title,
      content,
      deadline,
      is_opened: true,
    });
    return result;
  },
  read: async () => {
    return await Milestone.findAll({
      include: [Issue],
    });
  },
  readById: async ({ milestoneId }) => {
    if (!milestoneId) {
      return { error: '정보가 부족합니다.' };
    }
    return await Milestone.findOne({
      where: { id: milestoneId },
    });
  },

  update: async ({ milestoneId, title, deadline, content }) => {
    if (!milestoneId) {
      return { error: '정보가 부족합니다' };
    }

    return await Milestone.update(
      { title, deadline, content },
      { where: { id: milestoneId } }
    );
  },
  remove: async ({ milestoneId }) => {
    if (!milestoneId) {
      return { error: '정보가 부족합니다' };
    }

    return await Milestone.destroy({
      where: { id: milestoneId },
    });
  },
};
