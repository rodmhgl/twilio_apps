const twilio = require('twilio');
const Router = require('express').Router;
const ivrRouter = require('./ivr/router');
const callRouter = require('./call/router');

const router = new Router();

// GET: / - home page
router.get('/', (req, res) => {
  res.render('index');
});

router.use('/ivr', twilio.webhook({validate: false}), ivrRouter);
router.use('/call', twilio.webhook({validate: false}), callRouter);

module.exports = router;
