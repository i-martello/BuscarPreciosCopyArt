const ctrlProduct = require('../controllers/products');
const Router = require('express').Router;
const router = Router();

router.route('/').get(ctrlProduct.getAll)
router.get('/static', ctrlProduct.getStatic);

module.exports = router