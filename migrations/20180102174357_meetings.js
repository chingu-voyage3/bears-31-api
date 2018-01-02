/* eslint-disable */

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('meetings', (table) => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.string('location').notNullable();
      table.text('details');
      table.dateTime('due');
      table.integer('group_id').references('groups.id').notNullable();
      table.timestamps();
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('meetings'),
  ]);
};
