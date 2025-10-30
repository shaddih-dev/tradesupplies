const _ = require('lodash');
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const shopify = require('../shopify');

/**
 * Create a Draft Order with possible custom prices and return invoice URL.
 */
const createDraftOrder = catchAsync(async (req, res) => {
  try {
    const shopifyStoreName = _.get(req.body, 'shop', '');
    const products = _.get(req.body, 'products', []);

    if (!shopifyStoreName) {
      return res.status(httpStatus.BAD_REQUEST).send({ message: 'Shop is null' });
    }

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(httpStatus.BAD_REQUEST).send({ message: 'No products provided' });
    }

    const session = shopify.api.session.customAppSession(shopifyStoreName);

    // Prepare line items
    const lineItems = products.map((product) => {
      const customPriceStr = _.get(product, ['properties', '_Calculated Total']) ||
                             _.get(product, ['properties', '_calculated_total']) ||
                             null;

      let customPrice = null;
      if (customPriceStr && typeof customPriceStr === 'string') {
        const match = customPriceStr.match(/([\d,]+(?:\.\d+)?)/);
        if (match) {
          customPrice = parseFloat(match[1].replace(/,/g, ''));
        }
      }

      const quantity = Number(product.quantity) || 1;

      const lineItem = {
        variant_id: Number(product.id),
        quantity,
      };

      if (customPrice != null && !Number.isNaN(customPrice)) {
        lineItem.price = String(Number(customPrice).toFixed(2));
      }

      if (product.properties && typeof product.properties === 'object') {
        lineItem.properties = Object.entries(product.properties).map(([name, value]) => ({
          name,
          value: String(value),
        }));
      }

      return lineItem;
    });

    console.log('📦 Creating draft order for:', shopifyStoreName);
    console.log('📦 Line items:', JSON.stringify(lineItems, null, 2));

    const DraftOrder = shopify.api.rest.DraftOrder;
    const draftOrder = new DraftOrder({ session });

    draftOrder.line_items = lineItems;
    draftOrder.use_customer_default_address = true;

    await draftOrder.save();

    const invoiceUrl = draftOrder.invoice_url || draftOrder.invoiceUrl || null;

    console.log('✅ Draft order created:', draftOrder.id);
    console.log('🔗 Invoice URL:', invoiceUrl);

    if (!invoiceUrl) {
      return res.status(httpStatus.CREATED).send({
        message: 'Draft order created but invoice URL not returned by Shopify.',
        draft_order_id: draftOrder.id,
      });
    }

    return res.status(httpStatus.CREATED).send({
      invoice_url: invoiceUrl,
      invoiceUrl: invoiceUrl,
      checkoutUrl: invoiceUrl,
      draft_order_id: draftOrder.id,
    });
  } catch (err) {
    console.error('❌ createDraftOrder error', err);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ 
      message: 'Failed to create draft order', 
      error: String(err) 
    });
  }
});

module.exports = {
  createDraftOrder,
};
