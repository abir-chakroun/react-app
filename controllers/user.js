var express = require('express');
const bcrypt=require('bcryptjs');
const mongoose= require('mongoose');
const User = require('../models/user');
var jwt = require('jsonwebtoken');


exports.CreateUser= (req,res) =>{
    User.find({email: req.body.email}).exec()
        .then(user => {
        console.log(user)
        if(user.length>=1)
            res.send({error:"user already signed in"})
        else{    
            bcrypt.hash(req.body.password, 10, (err, hash)=> {
            if(err)
                console.log('error hashing the password !');
            else{
                const user= new User({
                    _id: new mongoose.Types.ObjectId(),
                    firstName:req.body.firstName,
                    lastName:req.body.lastName,
                    email: req.body.email,
                    password: hash
                })
                user
                .save()
                .then(data => {
                    res.send({message:"user created!"})
                    })
                .catch(err =>
                    res.send({ERROR :err}))
}
})
}
})
};

exports.LoginUser= async (req,res) => {
    await User.find({email:req.body.email}).exec()
        .then(user =>{
            if(user.length <1)
                res.status(401).end({message: "login unauthorized ! you should sign up first"})
            else{
            // Load hash from your password DB.
            bcrypt.compare(req.body.password, user[0].password, (err,result) => {
                if(err)
                    res.status(401).end({message:"login unauthorized !"})
                else{
                    if(result){
                        const token= jwt.sign({
                            email: req.body.email,
                            user_id: req.body._id
                          }, 'secret', { expiresIn: '1h' }, function(err, token) {
                              if(err) 
                                    console.log("error");
                              else{
                                            res.send({
                                            message: "user session created",
                                            token: token
                                        })
                        
                                }
                            })
                        }
                    else
                        res.send({message:"login unauthorized ! wrong password"})

                }
            });
        }
    })
    .catch(e=>{res.status(401).end({message:"login unauthorized ! wrong password"})})
}




