const Model = require('../model');

module.exports = {
  create: async ({
    milestoneId,
    assigneeId,
    labelId,
    title,
    content,
    dataValues: { id },
  }) => {
    if (!title) {
      return { error: '정보가 부족합니다' };
    }
    const transaction = await Model.sequelize.transaction();
    try {
      const issue = await Model.Issue.create(
        {
          title,
          content,
          user_id: id,
          milestone_id: milestoneId,
        },
        { transaction }
      );

      await issue.addLabels(labelId, { transaction });
      await issue.addIssues(assigneeId, { transaction });
      transaction.commit();
      return true;
    } catch (error) {
      await transaction.rollback();
      return { error };
    }
  },

  read: async () => {
    const issues = await Model.Issue.findAll({
      include: [
        {
          model: Model.User,
          as: 'Issues',
          through: {
            attributes: [],
          },
        },
        {
          model: Model.Label,
          through: {
            attributes: [],
          },
        },
      ],
    });

    return issues;
  },

  remove: async ({ id }) => {
    if (!id) {
      return { error: '없는 id값 입니다.' };
    }
    const issue = await Model.Issue.destroy({ where: { id } });
    if (issue) {
      return true;
    }
    return { error: '없는 id값 입니다.' };
  },

  updateTitle: async ({ id, title }) => {
    if (!id || !title) {
      return { error: '정보가 부족합니다.' };
    }
    const [result] = await Model.Issue.update({ title }, { where: { id } });
    if (result) {
      return true;
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
      return true;
    }
    return { error: '없는 id값 입니다.' };
  },

  updateState: async ({ id }) => {
    if (!id) {
      return { error: '정보가 부족합니다.' };
    }
    const issue = await Model.Issue.findOne({
      where: { id },
      attributes: [['is_opened', 'isOpened']],
    });
    if (!issue) {
      return { error: '없는 id값 입니다.' };
    }
    const isOpened = issue.dataValues;
    const [result] = await Model.Issue.update(
      { is_opened: !isOpened },
      { where: { id } }
    );
    if (result) {
      return true;
    }
    return { error: 'Issue 상태 변경 실패' };
  },

  updateAssignee: async ({ id, assigneeId }) => {
    if (!id || !assigneeId) {
      return { error: '정보가 부족합니다' };
    }
    const issue = await Model.Issue.findOne({ where: { id } });
    if (!issue) {
      return { error: '이슈가 없습니다' };
    }

    const [assignee] = await issue.getIssues({ where: { id: assigneeId } });

    if (assignee) {
      await issue.removeIssue(assigneeId);
      return true;
    }
    await issue.addIssue(assigneeId);
    return true;
  },

  updateLabel: async ({ id, labelId }) => {
    if (!id || !labelId) {
      return { error: '정보가 부족합니다' };
    }
    const issue = await Model.Issue.findOne({ where: { id } });
    if (!issue) {
      return { error: '이슈가 없습니다' };
    }

    const [label] = await issue.getLabels({ where: { id: labelId } });

    if (label) {
      await issue.removeLabel(labelId);
      return true;
    }
    await issue.addLabel(labelId);
    return true;
  },
};
