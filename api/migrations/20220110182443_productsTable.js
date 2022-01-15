exports.up = function (knex) {
    return knex.schema.createTable('products', table => {
        table.increments('id');
        table.text('sku').notNullable();
        table.text('name').notNullable()
        table.enum('size', ['small', 'medium', 'large']).nullable();
        table.decimal('price').notNullable();
        table.integer('stockLevel').notNullable();
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('products');
};