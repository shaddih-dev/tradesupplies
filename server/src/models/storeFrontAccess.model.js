const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const storeFrontAccess = mongoose.Schema(
    {
        shopifyAccessToken: {
            type: String,
            required: true,
        },
        shopifyStoreName: {
            type: String,
            required: false,
            default: '',
        },
        skuMap: {
            type: Object,
            required: false,
            default: {},
        },
        variantMapSku: {
            type: Array,
            required: false,
            default: [],
        },
    },
    {
      timestamps: true,
    }
);

storeFrontAccess.plugin(toJSON);

/**
 * @typedef StoreFrontAccess
 */
const StoreFrontAccess = mongoose.model('StoreFrontAccess', storeFrontAccess);

module.exports = StoreFrontAccess;