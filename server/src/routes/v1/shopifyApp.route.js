const express = require('express');
const shopifyController = require('../../controllers/shopify.controller.js');
const draftOrderController = require('../../controllers/draftOrder.controller.js');

const router = express.Router();
// Use session was approved by shopifyApi
router.post('/create-cart', shopifyController.createCart)
router.post('/create-draft-order', draftOrderController.createDraftOrder)
router.post('/update-shopify-map', shopifyController.updateShopifySKUMap)
router.get('/get-shopify-map', shopifyController.getShopifyMap)

module.exports = router;
