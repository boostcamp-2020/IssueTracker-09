const Model = require('../model');

module.exports = {
  create: async ({ milestoneId, assigneeId, labelId, title, id } = {}) => {
    if (!title) {
      return { error: '정보가 부족합니다' };
    }
    const transaction = await Model.sequelize.transaction();
    try {
      const issue = await Model.Issue.create(
        {
          title,
          user_id: id,
          milestone_id: milestoneId,
        },
        { transaction }
      );

      await issue.addLabels(labelId, { transaction });
      await issue.addAssignees(assigneeId, { transaction });
      transaction.commit();
      return issue;
    } catch (error) {
      await transaction.rollback();
      return { error };
    }
  },

  read: async ({ q } = {}) => {
    const query = q ? makeObj(q) : {};
    if (query.error) {
      return [];
    }

    const issues = await Model.Issue.findAll({
      include: [
        {
          model: Model.User,
          as: 'Assignees',
          where: query.assignee,
          through: {
            attributes: [],
          },
        },
        {
          model: Model.Milestone,
          where: query.milestone,
        },
        {
          model: Model.User,
          where: query.author,
        },
        {
          model: Model.Comment,
          where: query.comment,
          attributes: [],
        },
        {
          model: Model.Label,
          where: query.label,
          through: {
            attributes: [],
          },
        },
      ],
      attributes: ['id', 'title', 'is_opened', 'timestamp'],
      where: query.is,
    });

    return { issues };
  },

  readById: async ({ id } = {}) => {
    if (!id) {
      return { error: '없는 id값 입니다.' };
    }

    const issue = await Model.Issue.findOne({
      include: [
        {
          model: Model.User,
          as: 'Assignees',
          through: {
            attributes: [],
          },
        },
        {
          model: Model.Milestone,
        },
        {
          model: Model.User,
        },
        {
          model: Model.Label,
          through: {
            attributes: [],
          },
        },
      ],
      attributes: ['id', 'title', 'is_opened', 'timestamp'],
      where: { id },
    });

    const milestone = await Model.Milestone.findOne({
      include: [Model.Issue],
      where: { id: issue.Milestone.id },
    });

    const open = milestone.Issues.filter((issue) => issue.is_opened).length;
    const total = milestone.Issues.length;
    issue.Milestone.dataValues.openCount = open;
    issue.Milestone.dataValues.totalCount = total;

    return issue;
  },

  remove: async ({ id } = {}) => {
    if (!id) {
      return { error: '없는 id값 입니다' };
    }
    const issue = await Model.Issue.destroy({ where: { id } });
    if (issue) {
      return { response: true };
    }
    return { error: '없는 id값 입니다' };
  },

  updateTitle: async ({ id, title }) => {
    if (!id || !title) {
      return { error: '정보가 부족합니다.' };
    }
    const [result] = await Model.Issue.update({ title }, { where: { id } });
    if (result) {
      return { response: true };
    }
    return { error: '없는 id값 입니다.' };
  },

  updateMilestone: async ({ id, milestoneId }) => {
    if (!id) {
      return { error: '정보가 부족합니다.' };
    }
    const [result] = await Model.Issue.update(
      { milestone_id: milestoneId },
      { where: { id } }
    );
    if (result) {
      return { response: true };
    }
    return { error: '없는 id값 입니다.' };
  },

  updateState: async ({ id, isOpened } = {}) => {
    if ((id && !id.length) || isOpened === undefined) {
      return { error: '정보가 부족합니다' };
    }

    const issue = await Model.Issue.findAll({ where: { id } });

    if (issue.length !== id.length) {
      return { error: '없는 id값 입니다.' };
    }

    const [result] = await Model.Issue.update(
      { is_opened: isOpened },
      { where: { id } }
    );

    if (result) {
      return { response: true };
    }
    return { error: 'Issue 상태 변경 실패' };
  },

  updateAssignee: async ({ id, assigneeId, joined } = {}) => {
    if (!id || !assigneeId || joined === undefined) {
      return { error: '정보가 부족합니다' };
    }
    const issue = await Model.Issue.findOne({ where: { id } });
    if (!issue) {
      return { error: '이슈가 없습니다' };
    }
    if (joined) {
      await issue.addAssignees(assigneeId);
      return { response: true };
    }

    await issue.removeAssignees(assigneeId);
    return { response: true };
  },

  updateAssignees: async ({ id, checked, unchecked } = {}) => {
    if (!id) {
      return { error: '정보가 부족합니다' };
    }
    if (!checked.length && !unchecked.length) {
      return { response: true };
    }
    const transaction = await Model.sequelize.transaction();
    try {
      const issue = await Model.Issue.findOne({ where: { id } });
      await issue.removeAssignees([...checked, ...unchecked], { transaction });
      await issue.addAssignees(checked, { transaction });

      transaction.commit();
      return { response: true };
    } catch (error) {
      await transaction.rollback();
      return { error };
    }
  },

  updateLabels: async ({ id, checked, unchecked } = {}) => {
    if (!id) {
      return { error: '정보가 부족합니다' };
    }
    if (!checked.length && !unchecked.length) {
      return { response: true };
    }
    const transaction = await Model.sequelize.transaction();
    try {
      const issue = await Model.Issue.findOne({ where: { id } });
      await issue.removeLabels([...checked, ...unchecked], { transaction });
      await issue.addLabels(checked, { transaction });

      transaction.commit();
      return { response: true };
    } catch (error) {
      await transaction.rollback();
      return { error };
    }
  },

  updateLabel: async ({ id, labelId, joined } = {}) => {
    if (!id || !labelId) {
      return { error: '정보가 부족합니다' };
    }
    const issue = await Model.Issue.findOne({ where: { id } });
    if (!issue) {
      return { error: '이슈가 없습니다' };
    }
    const [label] = await issue.getLabels({ where: { id: labelId } });
    if (label && joined) {
      return { error: '라벨이 이미 등록되었습니다.' };
    }
    if (!label && !joined) {
      return { error: '라벨이 존재하지 않습니다.' };
    }

    if (joined) {
      await issue.addLabel(labelId);
      return { response: true };
    }
    await issue.removeLabel(labelId);
    return { response: true };
  },
};
const makeObj = (query) => {
  const obj = {};
  const querys = query.split(' ');
  querys.forEach((item) => {
    const temp = item.toLowerCase().split(':');

    if (!temp[1]) {
      obj['error'] = true;
      return obj;
    }

    if (temp[0] === 'is') {
      obj[temp[0]] = {
        is_opened: temp[1].includes('close')
          ? 0
          : temp[1].includes('open')
          ? 1
          : (obj['error'] = true),
      };
    } else if (temp[0] === 'author' || temp[0] === 'assignee') {
      obj[temp[0]] = { name: temp[1] };
    } else if (temp[0] === 'label' || temp[0] === 'milestone') {
      obj[temp[0]] = { title: temp[1] };
    } else if (temp[0] === 'comment') {
      obj[temp[0]] = {
        content: {
          [Model.Sequelize.Op.like]: '%' + temp[1] + '%',
        },
      };
    } else {
      obj['error'] = true;
    }
  });
  return obj;
};
