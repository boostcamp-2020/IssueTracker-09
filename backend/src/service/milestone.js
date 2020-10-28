const Milestone = require('../model').Milestone;
const Issue = require('../model').Issue;

module.exports = {
  create: async (body) => {
    const { title, content, deadline } = body;
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
  update: async (body) => {
    const { milestone_id, title, deadline, content } = body;

    return await Milestone.update(
      { title, deadline, content },
      { where: { id: milestone_id } }
    );
  },
  remove: async ({ milestone_id }) => {
    return await Milestone.destroy({
      where: { id: milestone_id },
    });
  },
};
