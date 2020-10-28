// Dependencies
const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const passportStrategy = require('./passport');
const sequelize = require('./model').sequelize;

// Router
const indexRouter = require('./routes');

// Config
const { config } = require('./config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(passport.initialize());
passportStrategy();

app.use('/api', indexRouter);

sequelize.sync().then(() => {
  console.log(`db connected`);
  app.listen(config.port, () => {
    console.log(`server is running on ${config.port} port`);
  });
});

module.exports = app;
