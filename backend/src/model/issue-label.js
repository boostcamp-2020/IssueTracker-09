module.exports = (sequelize, DataTypes) => {
  const IssueLabel = sequelize.define('Issue_Label');
  IssueLabel.associate = (db) => {
    db.IssueLabel.belongsTo(db.Issue, {
      foreignKey: 'issue_id',
    });
    db.IssueLabel.belongsTo(db.Label, {
      foreignKey: 'label_id',
    });
  };
  return IssueLabel;
};
