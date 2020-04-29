var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require("cors");
var mongoose= require('mongoose');

var productRoute = require('./routes/product');
var userRoute = require('./routes/user');
var cartRoute = require('./routes/cart');


require('dotenv').config()
var app = express();

app.use(cors())

app.use(logger("dev"));
app.use(express.json());

//connect to mongoDB

mongoose.connect(process.env.ATLAS_URI||'mongodb+srv://abir:passwordabir0000@cluster0-edhvj.mongodb.net/test?retryWrites=true&w=majority', 
{ useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
})
.then(() => console.log('DB Connected!!!'))
.catch(err => {
    console.log('did not work', err);
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(cookieParser());

app.use(express.static(path.join(__dirname, "build")));


app.get("/app", (req, res, err) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
console.log("    " + __dirname);


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});


//routes
app.use('/products', productRoute);
app.use('/user', userRoute);
app.use('/cart', cartRoute);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
