exports.up = (knex) =>
  knex.schema.createTable("whisper", (table) => {
    /*
    ____________________________________________________
    |                      whisper                     |
    ----------------------------------------------------
    | id | whisper | user_id | created_at | updated_at |
    ----------------------------------------------------
    */
    table.increments("id");
    table.text("whisper").notNullable();
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

exports.down = (knex) => knex.schema.dropTable("whisper");
