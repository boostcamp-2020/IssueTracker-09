const Model = require('../model');

module.exports = {
  create: async ({ milestoneId, assigneeId, labelId, title, content, id }) => {
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
      group: 'Comments.id',
      include: [
        { model: Model.Milestone },
        { model: Model.AssigneeIssue },
        { model: Model.IssueLabel },
        { model: Model.Comment, attributes: [] },
      ],
      attributes: [
        [
          Model.sequelize.fn('count', Model.sequelize.col('Comments.id')),
          'commentCount',
        ],
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
};
