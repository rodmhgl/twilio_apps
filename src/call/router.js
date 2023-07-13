const Router = require('express').Router;
const {playFreebird, playBakerStreet, playLetsGetItOn} = require('./handler');

const router = new Router();

// POST: /call/freebird
router.post('/freebird', (req, res) => {
  res.send(playFreebird());
});

// POST: /call/baker
router.post('/baker', (req, res) => {
  res.send(playBakerStreet());
});

// POST: /call/getiton
router.post('/getiton', (req, res) => {
  res.send(playLetsGetItOn());
});

module.exports = router;
