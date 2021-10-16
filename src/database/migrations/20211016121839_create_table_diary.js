exports.up = (knex) =>
  knex.schema.createTable("diary", (table) => {
    /*
    _________________________________________________
    |                     diary                     |
    -------------------------------------------------
    | id | path | user_id | created_at | updated_at |
    -------------------------------------------------
    */
    table.increments("id");
    table.text("path").unique().notNullable();
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

exports.down = (knex) => knex.schema.dropTable("diary");
