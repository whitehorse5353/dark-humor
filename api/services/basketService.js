const {getProductsByLimit, updateProductById} = require('./productService');

const getBasketItems = async (limit) => await getProductsByLimit(limit);

const updateBasketProductById = async (id, stockLevel) =>
    await updateProductById(id, stockLevel);

module.exports = {
    getBasketItems,
    updateBasketProductById,
};