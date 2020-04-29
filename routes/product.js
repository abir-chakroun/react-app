var express = require('express');
var router = express.Router();
const ProductsController= require('../controllers/product');
const checkAuth = require('../check-auth/checkAuth');

router.get('/',  ProductsController.getProducts);
router.post('/',  ProductsController.createProduct);
router.delete('/:id',  ProductsController.deleteProduct);



module.exports = router;
