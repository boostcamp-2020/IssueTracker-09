module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User, {
      foreignKey: 'user_id',
    });
    db.Comment.belongsTo(db.Issue, {
      foreignKey: 'issue_id',
    });
  };
  return Comment;
};
