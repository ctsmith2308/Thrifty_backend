
exports.up = function(knex, Promise) {
  return knex.schema.createTable('expendatures', (table) => {
    table.increments().primary()
    table.integer('user_id').references('users.id').onDelete('Cascade')
    table.integer('total_budget').defaultTo(0)
    table.integer('utilities').defaultTo(0)
    table.integer('transportation').defaultTo(0)
    table.integer('groceries').defaultTo(0)
    table.integer('savings').defaultTo(0)
    table.integer('entertainment').defaultTo(0)
    table.integer('clothing').defaultTo(0)
    table.integer('emergency').defaultTo(0)
    table.integer('miscellaneous').defaultTo(0)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('expendatures')
};
