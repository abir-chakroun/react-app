const Cart = require("../models/cart");
const Product = require("../models/product");
var express = require('express');
const mongoose = require("mongoose");

var get_cart = (req, res) => {
  Cart.find()
  .populate('product',['title','imagePath','price'])
  .exec()
    .then(docs => {
          res.send({
            count: docs.length,
            cart: docs.map(doc => ({
            _id: doc._id,
            quantity: doc.quantity,
            product: doc.product})
            )
        })
      })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

var create_order = async (req, res) => {
  await Product.findById(req.body.id)
    .then(product => {
        if (!product) { //product not found
              return res.status(404).json({
                message: "Product not found"
              });
        }
      else{     
              Cart.findOneAndUpdate({product:product._id},{$inc: {quantity: 1}}, (err,result)=> {
                if (result) {
                            res.send({
                              message: "product exists already in cart ! product updated",
                            })
                }
                else {            
                          const order = new Cart({
                          _id: mongoose.Types.ObjectId(),
                          quantity: req.body.quantity,
                          product: req.body.id
                          });
                          order.save()
                          .then(cart => {
                           res.send({
                            message: "new product to add to cart !"})
                         
                          })
                          .catch(err =>
                            res.send({ERROR :"could not add product to cart"}))
                }
              })
  
          }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err});
    });
  }

var get_order = (req, res) => {
  Cart.findById(req.params.orderId)
    .populate('product',['title','imagePath','price'])
    .exec()
    .then(order => {
      if (!order) {
        return res.status(404).json({
          message: "Order not found"
        });
      }
      // Product.findById(order.product)
      // .then(prod => {
      res.send({
          count: 1,
          cart: order   
    })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

var delete_order = (req, res) => {
  Cart.remove({ _id: req.params.orderId })
    .exec()
    .then(result => {
      res.send({
        message: "Order deleted",
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.get_cart=get_cart;
exports.create_order=create_order;
exports.get_order=get_order;
exports.delete_order=delete_order;
