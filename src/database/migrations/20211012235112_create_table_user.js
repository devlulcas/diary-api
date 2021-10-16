exports.up = (knex) =>
  knex.schema.createTable("user", (table) => {
    /*
    ______________________________________________________________
    |                            user                            |
    --------------------------------------------------------------
    | id | username | email | password | created_at | updated_at |
    --------------------------------------------------------------
    */
    table.increments("id");
    table.text("username").unique().notNullable();
    table.text("email").unique().notNullable();
    table.text("password").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("user");
