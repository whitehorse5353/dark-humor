'use strict';
const express = require('express');
const basket = new express.Router();
const {resourceNotFound} = require('../utils/index');

const {
    getBasketItems,
    updateBasketProductById,
} = require('../services/basketService');
const {getProducts, updateProductById} = require("../services/productService");

basket.get('/basket', async (request, response) => {
    const numberOfBasketItems = 3;
    const basketItems = await getBasketItems(numberOfBasketItems);
    if (!basketItems.length) {
        return resourceNotFound(response);
    }
    return response.json({basket: basketItems})
});

basket.put('/basket/:id', async (request, response) => {
    const {id} = request.params;
    const {stockLevel} = request.body;
    const product = await updateBasketProductById(id, stockLevel);
    if (!product) {
        return resourceNotFound(response);
    }
    return response.json({message: `Basket product - ${id} has been updated!`})
});

basket.delete('/basket', async (request, response) => {

});
module.exports = basket;
