exports.up = function (knex) {
  return knex.schema.createTable('photos', (table) => {
    table.increments('id')
    table.string('name')
    table.binary('image')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('photos')
}
