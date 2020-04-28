const express = require("express");
const router = express.Router();
const OrdersController = require("../controllers/cart");

router.get("/",  OrdersController.getCart);
router.post("/",  OrdersController.createOrder);
router.delete("/:orderId", OrdersController.deleteOrder);

module.exports = router;