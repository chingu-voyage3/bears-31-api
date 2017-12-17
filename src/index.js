const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json('Hello world!');
});

app.use('/api', router);

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`There will be dragons on port ${PORT}`);
});

module.exports = app;
