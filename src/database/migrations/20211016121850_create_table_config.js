exports.up = (knex) =>
  knex.schema.createTable("config", (table) => {
    /*
    _______________________________________________
    |                 config                      |
    -----------------------------------------------
    | id | color_scheme | created_at | updated_at |
    -----------------------------------------------
    */
    table.increments("id");
    table.integer("color_scheme").notNullable().defaultTo(0);
    // Timestamps
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("config");
