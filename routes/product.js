var express = require('express');
var router = express.Router();
const ProductsController= require('../controllers/product');
const checkAuth = require('../check-auth/checkAuth');

router.get('/',  ProductsController.getAllProducts);
router.get('/:id', ProductsController.getProductById);
router.get('/:title', ProductsController.getProductByName);





module.exports = router;
