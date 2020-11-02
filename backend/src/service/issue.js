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
      await issue.addUsers(assigneeId, { transaction });
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
        { model: Model.Milestone, required: false },
        {
          model: Model.Comment,
          required: false,
        },
      ],
      attributes: ['id', 'title', 'content', 'is_opened'],
    });
    const issue = await Promise.all(
      issues.map(async (issue) => {
        issue.dataValues['commentCount'] = issue.dataValues.Comments.length;
        delete issue.dataValues.Comments;
        const users = await issue.getUsers();
        const labels = await issue.getLabels();
        issue.dataValues['user'] = users;
        issue.dataValues['label'] = labels;
        return issue.dataValues;
      })
    );
    return issue;
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
};
