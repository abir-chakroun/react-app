Product = require('../models/product');
const Cart= require('../models/cart');
const mongoose= require('mongoose');
var express = require('express');


var getAllProducts = (req,res) => {
    var result = [];
    Product.find().exec()
    .then(products =>{
      for(i=0;i<products.length;i++){
        result.push({
            id:products[i].id,
            title:products[i].title,
            imagePath:products[i].imagePath,
            price: products[i].price,
            description: products[i].description
        })
      }
      res.send({
        products: result
  }) 
    })   
   .catch(err => {res.send({message :'could not find products'})})
}



  var getProductByName =  (req,res) => {
    Product.findOne({title:req.title}).exec()
    .then(product =>{
    const result={
              title:product.title,
              imagePath:product.imagePath,
              price: product.price,
              description: product.description
          }
          res.send({
            product: result
          }) 
        })
    .catch (e =>  res.send({message: "not able to find the product"}))
        }
 
  var getProductById = (req,res) => {
    Product.findById(req.params.id).exec()
    .then(product => {
      if (!product) {
        return res.status(404).json({
          message: "product not found"
        });
      }
    const result={
              title:product.title,
              imagePath:product.imagePath,
              price: product.price,
              description: product.description
          }
          res.send({product:result});
        })
    .catch(e =>
      { res.send({error: e})});
  }




  var AddProductToCart = (req,res) => {
      var cart = new Cart ();
      Product.findOne({_id:req.params.id}).exec()
      .then(result => {
        cart.add(result);
        console.log(cart)
        res.send({
          cart: cart
      })
      })
      .catch (e => res.send({message: "product not found !" }));
    }

    var RemoveProductFromCart = (req,res) => {
      var cart = new Cart (req.session.cart ? req.session.cart:{});
      Product.findOne({_id:req.params.id}).exec()
      .then(result => {
        cart.remove(result,req.params.id);
        // req.session.cart = cart;
        res.send({
          cart: cart
      })
      })
      .catch (e => res.send({message: "product not found in cart!" }));
    }

exports.getAllProducts=getAllProducts;
exports.getProductByName=getProductByName;
exports.getProductById=getProductById;
exports.AddProductToCart=AddProductToCart;
exports.RemoveProductFromCart=RemoveProductFromCart;