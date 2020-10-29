module.exports = (sequelize, DataTypes) => {
  const Issue = sequelize.define('Issue', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
    },
    is_opened: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });
  Issue.associate = (db) => {
    db.Issue.belongsTo(db.User, {
      foreignKey: 'user_id',
    });
    db.Issue.belongsTo(db.Milestone, {
      foreignKey: 'milestone_id',
      allowNull: true,
    });
    db.Issue.hasMany(db.Comment, {
      foreignKey: 'issue_id',
    });
    db.Issue.belongsToMany(db.User, {
      through: 'Assignee_Issue',
      foreignKey: 'issue_id',
    });
    db.Issue.belongsToMany(db.Label, {
      through: 'Issue_Label',
      foreignKey: 'issue_id',
    });
  };
  return Issue;
};
