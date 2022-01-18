'use strict';
const express = require('express');
const basket = new express.Router();
const {resourceNotFound} = require('../utils/index');

const {
    getBasketItems,
    updateBasketProductById,
} = require('../services/basketService');

let cachedBasketItem;

basket.get('/basket', async (request, response) => {
    const numberOfBasketItems = 3;
    const basketItems = (!cachedBasketItem || !cachedBasketItem.length) ? await getBasketItems(numberOfBasketItems) : cachedBasketItem;
    cachedBasketItem = basketItems;
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

basket.delete('/basket/:id', (request, response) => {
    const {id: basketItemId} = request.params;
    cachedBasketItem = cachedBasketItem.filter(({id}) =>
        Number(basketItemId) !== id);
    return response.json(cachedBasketItem);
});

module.exports = basket;
