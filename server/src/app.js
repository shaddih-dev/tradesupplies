const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const path = require("path");
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cookieParser = require('cookie-parser')
const serveStatic = require("serve-static");
const { errorConverter, errorHandler } = require('./middlewares/error');
const { shopifyAuthCallback, shopifyValidateAuthenticatedSession } = require("./utils/shopifyUtils.js");
const webhooksRoute = require("./routes/v1/webhooks.route.js")
const routes = require('./routes/v1');
const shopify = require('./shopify.js')
const shopifyAppRoute = require("./routes/v1/shopifyApp.route.js")
const shopifyController = require('./controllers/shopify.controller');

const app = express();

const STATIC_PATH = path.join(process.cwd(), 'public');

app.use(cors());

//----------Shopify setup----------------
// Set up Shopify authentication and webhook handling
console.log('shopify.config.auth.path', shopify.config.auth.path);
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  // shopify.auth.callback(),
  async (req, res, next) => {
    const oauthCompleted = await shopifyAuthCallback(req, res, shopify)

    if (oauthCompleted) {
      next();
    }
  },
  shopifyController.retriveStoreFrontAccess,
  async (req, res, next) => {
    if (res.headersSent) {
      console.log(
        'Response headers have already been sent, skipping redirection to host',
        {shop: res.locals.shopify?.session?.shop},
      );

      return;
    }
    const host = shopify.api.utils.sanitizeHost(req.query.host);
    res.redirect(`/home-shopify?shop=${res.locals.shopify.session.shop}&host=${encodeURIComponent(host)}`)
  }
  // Load the app otherwise
  // It not working with This app
  // shopify.redirectToShopifyOrAppRoot()
);

app.use("/shopify/*", (req, res, next) => {shopifyValidateAuthenticatedSession(req, res, next, shopify)});
// app.use("/v1/shopify/*", (req, res, next) => {shopifyValidateAuthenticatedSession(req, res, next, shopify)});
//----------End shopify setup------------

app.use('/v1/webhooks', webhooksRoute)

// parse json request body
// Limit the json
app.use(express.json({limit: "10mb"}));

//----------Shopify setup----------------
app.use('/v1/shopify', shopifyAppRoute)

app.use(serveStatic(STATIC_PATH, { index: false }));

app.use(cookieParser())

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// // v1 api routes
// app.use('/v1', routes);

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

app.get('*', function(req, res) {
    console.log('No found any matched route, return index', path.resolve("public", "index.html"))
    res.sendFile(path.resolve("public", "index.html"));
});
  
module.exports = app;