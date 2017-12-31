module.exports = {
  development: {
    username: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    database: process.env.DATABASE_NAME || 'hemsut_dev',
    host: process.env.DATABASE_HOST || '127.0.0.1',
    port: process.env.DATABASE_PORT || 5432,
    dialect: 'postgres',
    logging: console.log,
    define: {
      underscored: true, // snake_case timestamps
      underscoredAll: true, // Converts camelCase model names to snake_case
    },
  },
  test: {
    username: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    database: process.env.DATABASE_NAME || 'hemsut_test',
    host: process.env.DATABASE_HOST || '127.0.0.1',
    port: process.env.DATABASE_PORT || 5432,
    dialect: 'postgres',
    define: {
      underscored: true,
      underscoredAll: true,
    },
  },
  production: {
    url: process.env.DATABASE_URL,
    ssl: true,
    dialect: 'postgres',
    dialectOptions: {
      ssl: true,
    },
    define: {
      underscored: true,
      underscoredAll: true,
    },
  },
};
