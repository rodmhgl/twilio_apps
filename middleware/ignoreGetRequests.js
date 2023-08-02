module.exports = function(req, res, next) {
  if (req.method === 'GET') {
    res.status(405).send('GET requests are not allowed');
  } else {
    next();
  }
};
