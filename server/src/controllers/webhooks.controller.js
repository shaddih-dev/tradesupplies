const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const _ = require('lodash')
const shopify = require('../shopify');
const crypto = require('crypto');

const onWebHook = catchAsync(async (req, res) => {
    try {
        // Note: the express.text() given above is an Express middleware that will read
        // in the body as a string, and make it available at req.body, for this path only.
        const rs = await shopify.api.webhooks.validate({
          rawBody: req.body, // is a string
          rawRequest: req,
          rawResponse: res,
        });

        if(rs.valid){
            console.log('rs', rs.topic, rs.domain)
            req.body = JSON.parse(req.body)
            res.status(httpStatus.OK).send()
        } else {
            res.status(401).send("Couldn't verify incoming Webhook request!");
        }
    } catch (error) {
        console.log(error.message);
        res.status(httpStatus.BAD_REQUEST).send()
    }
})

const handleWebhookRequest = async (
    topic,
    shop,
    webhookRequestBody,
    webhookId,
    apiVersion,
  ) => {
    const sessionId = shopify.session.getOfflineId(shop);
    console.log(
        '---WEBHOOK', 
        sessionId,  
        topic,
        shop,
        webhookRequestBody,
        webhookId,
        apiVersion,
    )
    // Run your webhook-processing code here!
};

const onShopifyDataRequest = catchAsync(async (req, res) => {
    res.status(httpStatus.OK).send()
})

const onShopifyCustomersRedact = catchAsync(async (req, res) => {
    res.status(httpStatus.OK).send()
})

const onShopifyShopRedact = catchAsync(async (req, res) => {
    res.status(httpStatus.OK).send()
})

module.exports = {
    onShopifyDataRequest,
    onShopifyCustomersRedact,
    onShopifyShopRedact,
    handleWebhookRequest,
    onWebHook,
};