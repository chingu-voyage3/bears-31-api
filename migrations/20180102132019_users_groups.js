/* eslint-disable */

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users_groups', (table) => {
      table.integer('user_id').references('users.id');
      table.integer('group_id').references('groups.id');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users_groups'),
  ]);
};
