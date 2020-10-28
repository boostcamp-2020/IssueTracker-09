module.exports = (sequelize, DataTypes) => {
  const Label = sequelize.define('Label', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    color: {
      type: DataTypes.MEDIUMINT,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
    },
  });
  Label.associate = (db) => {
    db.Label.hasMany(db.IssueLabel, {
      foreignKey: 'label_id',
    });
  };
  return Label;
};
