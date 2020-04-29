const Cart = require("../models/cart");
const Product = require("../models/product");
var express = require('express');
const mongoose = require("mongoose");

exports.getCart = (req, res) => {
      
      if(Object.keys(req.query).length>0){ 
        Cart.findById(req.query.id)
        .populate('product',['title','imagePath','price'])
        .exec()
        .then(order => {
          if (!order) {
            return res.status(404).json({
              message: "Order not found"
            });
          }
    
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
      }
      else{
          console.log(req.query)
          var result = [];
          Cart.find()
          .populate('product',['title','imagePath','price'])
          .exec()
            .then(docs => {
                for(i=0;i<docs.length;i++){
                  result.push({
                      _id:docs[i]._id,
                      quantity:docs[i].quantity,
                      product:docs[i].product,
                  })
                }
                res.send({
                  cart: result
            })
          }) 
            .catch(err => {
              res.status(500).json({
                error: err
              });
            });
          }
};

exports.createOrder =  (req, res) => {
   Product.findById(req.body._id)
    .exec()
    .then(product => {
      console.log("from DB  " + product._id);
        if (product) { 
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
                          product: req.body._id
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
          else{
            return res.send({
                message: "Cannot find product"
              });
          }   
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err});
    });
  }


exports.deleteOrder = (req, res) => {
  console.log("in delete method")
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


exports.UpdateQuantity = (req,res) => {
  const currentId = req.params.orderId;
  const value = req.body.value;
  Cart.findOneAndUpdate({_id:currentId},{$inc: {quantity: value}})
  .then(result => {
      res.send({
        message: "cart quantity updated",
      })
    })
    .catch(err => {
  res.status(500).json({
    error: err });
})
}
  