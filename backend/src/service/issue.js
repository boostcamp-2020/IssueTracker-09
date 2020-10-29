const Model = require('../model');

module.exports = {
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
};
