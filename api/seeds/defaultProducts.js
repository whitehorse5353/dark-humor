const {items} = require('../products/index.json');
const {TABLE_NAME} = require('../constants/index')
exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex(TABLE_NAME.PRODUCTS).del()
        .then(function () {
            // Inserts seed entries
            return knex(TABLE_NAME.PRODUCTS).insert(items);
        });
};
