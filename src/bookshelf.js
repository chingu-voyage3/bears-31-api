const dbConfig = require('../knexfile');

const environment = process.env.NODE_ENV || 'development';
console.log(`Trying to connect to: ${environment}`);
const knex = require('knex')(dbConfig[environment]);
const bookshelf = require('bookshelf')(knex);

bookshelf.plugin('registry');

module.exports = bookshelf;
