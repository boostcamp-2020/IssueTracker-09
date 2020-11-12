// Dependencies
const Sequelize = require('sequelize');

// Config
const { dbConfig } = require('../config');

const sequelize = new Sequelize(dbConfig);
const User = require('./user')(sequelize, Sequelize);
const Issue = require('./issue')(sequelize, Sequelize);
const Comment = require('./comment')(sequelize, Sequelize);
const Label = require('./label')(sequelize, Sequelize);
const Milestone = require('./milestone')(sequelize, Sequelize);

const db = {
  User,
  Issue,
  Comment,
  Label,
  Milestone,
};

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
