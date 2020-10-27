module.exports = (sequelize, DataTypes) => {
  const AssigneeIssue = sequelize.define('Assignee_Issue');
  AssigneeIssue.associate = (db) => {
    db.AssigneeIssue.belongsTo(db.User, {
      foreignKey: 'user_id',
    });
    db.AssigneeIssue.belongsTo(db.Issue, {
      foreignKey: 'issue_id',
    });
  };
  return AssigneeIssue;
};
