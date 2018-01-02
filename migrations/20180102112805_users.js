/* eslint-disable */

exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('users', (table) => {
      table.increments('id').primary();
      table.string('username').notNullable().unique();
      table.string('firstName');
      table.string('lastName');
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.timestamps();
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
  ]);
};
