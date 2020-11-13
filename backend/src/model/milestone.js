module.exports = (sequelize, DataTypes) => {
  const Milestone = sequelize.define('Milestone', {
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
    deadline: {
      type: DataTypes.DATEONLY,
    },
    is_opened: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
  Milestone.associate = (db) => {
    db.Milestone.hasMany(db.Issue, {
      foreignKey: 'milestone_id',
      allowNull: true,
    });
  };
  return Milestone;
};
