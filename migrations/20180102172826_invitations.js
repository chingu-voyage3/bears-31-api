/* eslint-disable */

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('invitations', (table) => {
      table.increments('id').primary();
      table.string('email').notNullable();
      table.integer('group_id').references('groups.id').notNullable();
      table.timestamps();
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('invitations'),
  ]);
};
