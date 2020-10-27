// Dependencies
const express = require('express');
const morgan = require('morgan');

// Router
const indexRouter = require('./routes');

// Config
const { config } = require('./config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use('/api', indexRouter);

app.listen(config.port, () => {
  console.log(`server is running on ${config.port} port`);
});
