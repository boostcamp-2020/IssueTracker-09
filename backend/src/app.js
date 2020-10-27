// Dependencies
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.listen(process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT} port`);
});
