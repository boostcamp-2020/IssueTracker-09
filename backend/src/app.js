// Dependencies
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Router
const indexRouter = require('./routes');

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use('/api', indexRouter);

app.listen(process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT} port`);
});
