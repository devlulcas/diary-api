exports.up = (knex) =>
  knex.schema.createTable("config", (table) => {
    /*
    _________________________________________________________
    |                         config                        |
    ---------------------------------------------------------
    | id | color_scheme | user_id | created_at | updated_at |
    ---------------------------------------------------------
    */
    table.increments("id");
    table.integer("color_scheme").unique().notNullable().defaultTo(0);
    // Relacionamento com user
    table
      .integer("user_id")
      .notNullable()
      .references("id")
      .inTable("user")
      .onDelete("CASCADE")
      .index();
    // Timestamps
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("config");
