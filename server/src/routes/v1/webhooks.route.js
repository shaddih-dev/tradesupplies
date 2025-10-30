const express = require('express');
const webhooksController = require('../../controllers/webhooks.controller.js');

const router = express.Router();

router.post('/data-request', express.text({type: '*/*'}), webhooksController.onWebHook)
router.post('/customers-redact', express.text({type: '*/*'}), webhooksController.onWebHook)
router.post('/shop-redact', express.text({type: '*/*'}), webhooksController.onWebHook)
router.post('/', express.text({type: '*/*'}), webhooksController.onWebHook)

module.exports = router;