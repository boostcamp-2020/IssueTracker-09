const Milestone = require('../model').Milestone;
const Issue = require('../model').Issue;

module.exports = {
  create: async ({ title, content, deadline } = {}) => {
    if (!title || !content || !deadline) {
      return { error: '정보가 부족합니다' };
    }
    const milestone = await Milestone.create({
      title,
      content,
      deadline,
      is_opened: true,
    });
    return milestone;
  },

  read: async () => {
    const milestones = await Milestone.findAll({
      include: [Issue],
    });

    const milestone = milestones.map((mile) => {
      const open = mile.dataValues.Issues.filter((issue) => issue.is_opened)
        .length;
      const total = mile.dataValues.Issues.length;
      mile.dataValues['openCount'] = open;
      mile.dataValues['totalCount'] = total;
      delete mile.dataValues.Issues;
      return mile.dataValues;
    });

    return { milestones: milestone };
  },

  update: async ({ id, title, deadline, content } = {}) => {
    if (!id) {
      return { error: '정보가 부족합니다' };
    }

    const [result] = await Milestone.update(
      { title, deadline, content },
      { where: { id } }
    );
    if (result === 1) return { response: true };
    return { response: false };
  },
  remove: async ({ id } = {}) => {
    if (!id) {
      return { error: '정보가 부족합니다' };
    }

    const result = await Milestone.destroy({
      where: { id },
    });
    if (result === 1) return { response: true };
    return { response: false };
  },

  updateState: async ({ id, isOpened } = {}) => {
    if (!id) {
      return { error: '정보가 부족합니다' };
    }
    const milestone = await Milestone.findOne({ where: { id } });

    if (!milestone) {
      return { error: '마일스톤이 존재하지 않습니다' };
    }
    const [result] = await Milestone.update(
      { is_opened: isOpened },
      { where: { id } }
    );
    if (result) {
      return { response: true };
    }
    return { error: 'Milestone 상태 변경 실패' };
  },
};
