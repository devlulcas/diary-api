module.exports = {
  development: {
    client: "pg",
    connection: {
      database: "my_secret_diary",
      user: "postgres",
      password: process.env.PG_DEV_PSWD,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: `${__dirname}/src/database/migrations`,
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_secret_diary",
      user: process.env.PG_PROD_USER,
      password: process.env.PG_PROD_PSWD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: `${__dirname}/src/database/migrations`,
    },
  },
};
