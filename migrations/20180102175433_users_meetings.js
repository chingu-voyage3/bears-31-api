/* eslint-disable */

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users_meetings', (table) => {
      table.integer('user_id').references('users.id');
      table.integer('meeting_id').references('meetings.id');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users_meetings'),
  ]);
};
