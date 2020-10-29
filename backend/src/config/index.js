const dotenv = require('dotenv');

dotenv.config();

exports.config = {
  port: process.env.PORT,
};

exports.dbConfig = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  port: process.env.DB_PORT,
  define: {
    freezeTableName: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: false,
  },
};
