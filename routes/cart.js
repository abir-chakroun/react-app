const express = require("express");
const router = express.Router();
const OrdersController = require("../controllers/cart");

router.get("/all",  OrdersController.get_cart);

router.post("/",  OrdersController.create_order);

router.get("/:orderId",  OrdersController.get_order);

router.delete("/:orderId", OrdersController.delete_order);

module.exports = router;