const _ = require('lodash');
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const shopify = require('../shopify');

const createDraftOrder = catchAsync(async (req, res) => {
    try {
        const shopifyStoreName = _.get(req.body, 'shop', '');
        const products = _.get(req.body, 'products', []);
        
        if(!shopifyStoreName) {
            return res.status(httpStatus.BAD_REQUEST).send({message: `Shop is null`});
        }

        if(products.length === 0) {
            return res.status(httpStatus.BAD_REQUEST).send({message: `No products provided`});
        }

        // Create session (this should use your actual stored session)
        const session = shopify.api.session.customAppSession(shopifyStoreName);

        // Prepare line items with custom prices
        const lineItems = products.map(product => {
            // Extract custom price from properties
            const customPriceStr = product.properties?.['_Calculated Total'];
            let customPrice = null;
            
            if (customPriceStr) {
                const match = customPriceStr.match(/£([\d.]+)/);
                if (match) {
                    customPrice = parseFloat(match[1]);
                }
            }

            const lineItem = {
                variant_id: product.id,
                quantity: product.quantity,
            };

            // Add custom price if available
            if (customPrice) {
                lineItem.price = customPrice.toFixed(2);
            }

            // Add custom properties
            if (product.properties) {
                lineItem.properties = Object.entries(product.properties).map(([name, value]) => ({
                    name,
                    value: String(value)
                }));
            }

            return lineItem;
        });

        // Create draft order
        const draftOrder = new shopify.api.rest.DraftOrder({session});
        draftOrder.line_items = lineItems;
        draftOrder.use_customer_default_address = true;
        
        await draftOrder.save({update: true});

        // Generate invoice URL for customer to complete purchase
        const invoiceUrl = draftOrder.invoice_url;

        res.status(httpStatus.OK).send({
            success: true,
            draftOrderId: draftOrder.id,
            invoiceUrl: invoiceUrl,
            checkoutUrl: invoiceUrl // Use invoice URL as checkout
        });

    } catch (err) {
        console.error('Draft order error:', err);
        res.status(httpStatus.BAD_REQUEST).send({
            message: err.message || `Can't create draft order`
        });
    }
});

module.exports = {
    createDraftOrder
};
