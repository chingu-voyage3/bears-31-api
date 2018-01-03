// Update with your config settings.

module.exports = {
  client: 'pg',
  // connection: process.env.DATABASE_URL,
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'postgres',
    database: 'hemsut_api',
    charset: 'utf8',
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
  debug: true,
};
