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
    const milestones = await Milestone.findAll({
      include: [Issue],
    });

    return milestones.map((mile) => {
      const open = mile.Issues.filter((issue) => issue.is_opened).length;
      const total = mile.Issues.length;
      mile.dataValues['openCount'] = open;
      mile.dataValues['totalCount'] = total;
      delete mile.dataValues.Issues;
      return mile.dataValues;
    });
  },

  update: async ({ id }, { title, deadline, content }) => {
    if (!id) {
      return { error: '정보가 부족합니다' };
    }

    const [result] = await Milestone.update(
      { title, deadline, content },
      { where: { id } }
    );
    if (result === 1) return true;
    return false;
  },
  remove: async ({ id }) => {
    if (!id) {
      return { error: '정보가 부족합니다' };
    }

    const result = await Milestone.destroy({
      where: { id },
    });
    if (result === 1) return true;
    return false;
  },
};
