const Product = require('../models/product');
const mongoose= require('mongoose');
var express = require('express');


  exports.getProducts = (req, res, next) => {
      console.log(Object.keys(req.query).length);
      if(Object.keys(req.query).length>0)
      {
        Product.findById(req.query.id)
            .exec()
            .then(doc => {
              console.log("From database", doc);
              if (doc) {
                res.status(200).json({
                  product: doc
                   });
              } else {
                res
                  .status(404)
                  .json({ message: "No valid entry found for provided ID" });
              }
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({ error: err });
            });
      }
      else{
      Product.find()
        .exec()
        .then(docs => {
          const response = {
            products: docs.map(doc => {
              return {
                _id: doc._id,
                title: doc.title,
                imagePath: doc.imagePath,
                description: doc.description,
                price: doc.price
              };
            })
          };
          res.status(200).json(response);
             })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
      }
    };

 
  exports.createProduct = (req, res, next) => {
      const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        imagePath: req.body.imagePath,
        description: req.body.description,
        price: req.body.price
      });
      product
        .save()
        .then(result => {
          console.log(result);
          res.status(201).json({
            message: "Created product successfully",
            createdProduct: {
              title: result.title,
              imagePath: result.imagePath,
              description: result.description,
              price: result.price,
              _id: result._id,
              
            }
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
    };


