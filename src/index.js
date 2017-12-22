const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./router');
const models = require('./db/models');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(cors());

app.get('/', (req, res) => {
  res.json('Hello world!');
});

app.use('/api', router);

const PORT = process.env.PORT || 9000;

models.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`There will be dragons on port ${PORT}`);
  });
});

module.exports = app;
