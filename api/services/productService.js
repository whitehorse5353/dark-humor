const {development} = require('../knexfile');
const db = require('knex')(development);
const {TABLE_NAME} = require('../constants/index');

const getProducts = async () => await db.select()
    .table(TABLE_NAME.PRODUCTS);

const getProductsByLimit = async (limit) => await db.select()
    .table(TABLE_NAME.PRODUCTS)
    .where('stockLevel', '>', 0)
    .limit(limit);

const getProductById = async (id) => await db.select()
    .table(TABLE_NAME.PRODUCTS)
    .where({id});

const updateProductById = async (id, stockLevel) => await db.select()
    .table(TABLE_NAME.PRODUCTS)
    .where({id})
    .update({stockLevel});

const deleteProductById = async (id) => await db.select()
    .table(TABLE_NAME.PRODUCTS)
    .where({id})
    .delete();

module.exports = {
    getProducts,
    getProductsByLimit,
    getProductById,
    updateProductById,
    deleteProductById
};