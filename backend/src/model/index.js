// Dependencies
const Sequelize = require('sequelize');

// Config
const { dbConfig } = require('../config');

const sequelize = new Sequelize(dbConfig);
const db = {};

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
