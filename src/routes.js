import express from 'express';
var router = express.Router();

/* GET home page. */
router.get('/yo', function(req, res, next) {
  res.send('yay');
});

module.exports = router;