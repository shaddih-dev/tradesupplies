const _ = require('lodash');
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const shopify = require('../shopify')
const { storeFrontAccessService } = require('../services')
const { GraphQLClient, gql } = require('graphql-request')

const createCart = catchAsync(async (req, res) => {
    try {
        const shopifyStoreName = _.get(req.body, 'shop', '')
        if(!shopifyStoreName) {
            return res.status(httpStatus.BAD_REQUEST).send({message: `Shop is null`})
        }
        const access = await storeFrontAccessService.getStoreFrontAccessByShopName(shopifyStoreName)
        if(!access) {
            return res.status(httpStatus.BAD_REQUEST).send({message: `Can't get shopify session`})
        }
        const endpoint = `https://${shopifyStoreName}/api/2023-10/graphql.json`
        const graphQLClient = new GraphQLClient(endpoint, {
            headers: {
            'X-Shopify-Storefront-Access-Token': access.shopifyAccessToken,
            },
        })
        const products = _.get(req.body, 'products', [])
        

        let productDatas = ''

        products.forEach((el, index) => {
            productDatas += `{quantity: ${el.quantity}, merchandiseId: "${el.merchandiseId}"}${index != products.length - 1 ? ',' : ''}`
        })

        if(shopifyStoreName) {
            const query = gql`
                mutation {
                    cartCreate(
                        input: {
                            lines: [
                                ${productDatas}
                            ],
                            # The information about the buyer that's interacting with the cart.
                            buyerIdentity: {
                            }
                            attributes: {
                                key: "cart_attribute",
                                value: "This is a cart attribute"
                            }
                        }
                    ) {
                        cart {
                            id
                            checkoutUrl
                            createdAt
                            updatedAt
                            lines(first: 250) {
                                edges {
                                    node {
                                        id
                                        merchandise {
                                            ... on ProductVariant {
                                                id
                                            }
                                        }
                                    }
                                }
                            }
                            buyerIdentity {
                                deliveryAddressPreferences {
                                    __typename
                                }
                            }
                            attributes {
                                key
                                value
                            }
                            # The estimated total cost of all merchandise that the customer will pay at checkout.
                            cost {
                                totalAmount {
                                    amount
                                    currencyCode
                                }
                                # The estimated amount, before taxes and discounts, for the customer to pay at checkout.
                                subtotalAmount {
                                    amount
                                    currencyCode
                                }
                                # The estimated tax amount for the customer to pay at checkout.
                                totalTaxAmount {
                                    amount
                                    currencyCode
                                }
                                # The estimated duty amount for the customer to pay at checkout.
                                totalDutyAmount {
                                    amount
                                    currencyCode
                                }
                            }
                        },
                        userErrors {
                            code
                            field
                            message
                        }
                    }
                }
            `
            const response = await graphQLClient.request(query)

            res.status(httpStatus.OK).send(response)
        } else {
            res.status(httpStatus.BAD_REQUEST).send({message: `Can't get shopify session`})
        }
    }
    catch (err) {
      res.status(httpStatus.BAD_REQUEST).send({message: `Can't get shopify session`})
    }
});

const updateShopifySKUMap = catchAsync(async (req, res) => {
    try {
        const shopifyStoreName = _.get(req.body, 'shop', '')
        const skuMap = _.get(req.body, 'skuMap', '')

        let access = await storeFrontAccessService.getStoreFrontAccessByShopName(shopifyStoreName)
        if(access) {
            access = await storeFrontAccessService.updateStoreFrontAccessById(
                access._id, 
                {
                    skuMap
                }
            )
        } else {
            access = await storeFrontAccessService.createStoreFrontAccess({
                skuMap, 
                shopifyStoreName
              }
            )
        }

        res.status(httpStatus.OK).send(access)
    }
    catch (err) {
      res.status(httpStatus.BAD_REQUEST).send({message: `Can't save SKU`})
    }
});

const getShopifyMap = catchAsync(async (req, res) => {
    try {
        const shopifyStoreName = _.get(req.query, 'shop', '')

        let access = await storeFrontAccessService.getStoreFrontAccessByShopName(shopifyStoreName)
        if(access) {
            return res.status(httpStatus.OK).send({
                skuMap: _.get(access, ['skuMap'], {}),
                variantMapSku: _.get(access, ['variantMapSku'], []),
            })
        } else {
            return res.status(httpStatus.BAD_REQUEST).send({message: `Can't get map`})
        }
    }
    catch (err) {
      res.status(httpStatus.BAD_REQUEST).send({message: `Can't get map`})
    }
});


const retriveStoreFrontAccess = async (req, res, next) => {
    const shopifySession = _.get(res, ['locals', 'shopify', 'session'])

    await handleStoreFrontApi(shopifySession)

    next()
}

const handleStoreFrontApi = async (shopifySession) => {
    try {
        const shopifyInfo = _.pick(shopifySession, ["id", "shop"])
        const allStorefrontAccessTokens = await shopify.api.rest.StorefrontAccessToken.all({
            session: shopifySession,
        });

        const allProducts = await shopify.api.rest.Product.all({
            session: shopifySession,
            limit: 250
        });

        const prodData = _.get(allProducts, ['data'], [])
        const allVariants = _.flatMap(prodData, el => _.get(el, ['variants'], []))
        const variantMapSku = allVariants.map(el => {
            return {
                id: el.id,
                sku: el.sku
            }
        }).filter(el => el.sku)
        
        const storeFrontTokens = _.get(allStorefrontAccessTokens, ['data'], [])
        let access = await storeFrontAccessService.getStoreFrontAccessByShopName(shopifyInfo.shop)
        if(access && storeFrontTokens.length > 0){
            access = await storeFrontAccessService.updateStoreFrontAccessById(
                access._id, 
                {
                    shopifyAccessToken: _.get(storeFrontTokens, ['0', 'access_token'], ''), 
                    shopifyStoreName: shopifyInfo.shop,
                    variantMapSku: variantMapSku
                }
            )
        } else {
            const storefrontAccessToken = new shopify.api.rest.StorefrontAccessToken({session: shopifySession});
            storefrontAccessToken.title = "Metadrob Store Front Access Token";
            await storefrontAccessToken.save({
                update: true,
            });
            access = await storeFrontAccessService.createStoreFrontAccess({
                    shopifyAccessToken: _.get(storefrontAccessToken, ['access_token'], ''), 
                    shopifyStoreName: shopifyInfo.shop,
                    variantMapSku: variantMapSku
                }
            )
        }
    
        console.log("INIT STORE FRONT TOKEN SUCCESSFULLY!")
    } catch(err) {
        console.log("INIT STORE FRONT TOKEN FAIL!", _.get(err, ['message']))
    }
}

module.exports = {
    createCart,
    retriveStoreFrontAccess,
    updateShopifySKUMap,
    getShopifyMap
};