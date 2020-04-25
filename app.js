var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var productRoute = require('./routes/product');
var userRoute = require('./routes/user');
var cartRoute = require('./routes/cart');
var createError = require("http-errors");
var cors = require("cors");
var mongoose= require('mongoose');



require('dotenv').config()
var app = express();

app.use(cors())

app.use(logger("dev"));
app.use(express.json());

//connect to mongoDB

mongoose.connect(process.env.ATLAS_URI || 'mongodb+srv://user:passwordabir0000@cluster0-edhvj.mongodb.net/shopping', {useNewUrlParser: true, useUnifiedTopology: true})    
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log('ERROR connecting !!!! ' + err));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(cookieParser());

app.use(express.static(path.join(__dirname, "build")));

// app.get("/app", (req, res, err) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

//heroku
if (process.env.NODE_ENV === 'production'){
  app.use(express.static('Client/build'))

  app.get('*', (re,res) => {
    res.sendFile(path.join(__dirname,'Client', 'build', 'index.html'));
    })
}

//routes
app.use('/', productRoute);
app.use('/user', userRoute);
app.use('/cart', cartRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
}); 

// error handlers

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
