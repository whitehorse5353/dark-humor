const {development} = require('../knexfile');
const db = require('knex')(development);
const {getProductsByLimit, updateProductById} = require('./productService');
const {TABLE_NAME} = require('../constants/index');

const getBasketItems = async (limit) => {
    const basketItems = await getProductsByLimit(limit);
    return basketItems;
}

const updateBasketProductById = async (id, stockLevel) =>
    await updateProductById(id, stockLevel);
//
// const updateProductById = async (id, stockLevel) => await db.select()
//     .table(TABLE_NAME.PRODUCTS)
//     .where({id})
//     .update({stockLevel});
//
// const deleteProductById = async (id) => await db.select()
//     .table(TABLE_NAME.PRODUCTS)
//     .where({id})
//     .delete();

module.exports = {
    getBasketItems,
    updateBasketProductById,
};