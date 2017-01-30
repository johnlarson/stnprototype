import * as express from 'express';
const router:express.Router = express.Router();

/* GET home page. */
router.get('/yo', function(req, res, next) {
  res.send('yay');
});

export default router;