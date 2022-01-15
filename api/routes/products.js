'use strict';
const express = require('express');
const products = new express.Router();
const {resourceNotFound} = require('../utils/index');

const {
    getProducts,
    getProductById,
    updateProductById,
    deleteProductById
} = require('../services/productService');

products.get('/products', async (request, response) => {
    const products = await getProducts();
    if (!products.length) {
        return resourceNotFound(response);
    }
    return response.json({products})
});

products.get('/products/:id', async (request, response) => {
    const {id} = request.params;
    const product = await getProductById(id);
    if (!product.length) {
        return resourceNotFound(response);
    }
    return response.json(...product);

});

products.put('/products/:id', async (request, response) => {
    const {id} = request.params;
    const {quantity: stockLevel} = request.body;
    const product = await updateProductById(id, stockLevel);
    if (!product) {
        return resourceNotFound(response);
    }
    return response.json({message: `product - ${id} has been updated!`})
});

products.delete('/products/:id', async (request, response) => {
    const {id} = request.params;
    const product = await deleteProductById(id);
    if (!product) {
        return resourceNotFound(response);
    }
    return response.json({message: `product - ${id} has been deleted!`})
});
module.exports = products;
