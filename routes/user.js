var express = require('express');
var router = express.Router();
const UserController = require('../controllers/user');



router.post('/signup',UserController.CreateUser);
router.post('/login', UserController.LoginUser);




module.exports = router;
