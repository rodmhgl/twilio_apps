const twilio = require('twilio');
const Router = require('express').Router;
const ignoreGetRequests = require('../middleware/ignoreGetRequests');
const ivrRouter = require('./ivr/router');
const callRouter = require('./call/router');

const router = new Router();

router.use(ignoreGetRequests);
router.use('/ivr', twilio.webhook({validate: false}), ivrRouter);
router.use('/call', twilio.webhook({validate: false}), callRouter);

module.exports = router;
