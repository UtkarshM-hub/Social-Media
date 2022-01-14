var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Mongoose=require('mongoose');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postRouter = require('./routes/Post');
const AuthRouter=require('./routes/auth');

var app = express();
const URI='mongodb+srv://UtMandape:1BGR3QO2fcFmFHXw@cluster0.akibk.mongodb.net/Social-Media?retryWrites=true&w=majority'

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
  'Origin, X-Requeted-With, Content-Type, Accept, Authorization, RBR');
  if (req.headers.origin) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
  }
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
      return res.status(200).json({});
  }
  next();
}); 
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/images",express.static(path.join(__dirname, 'images')));
app.use('/posts',express.static(path.join(__dirname, 'Posts')));
app.use('/userData',express.static(path.join(__dirname, 'userData')));

app.use('/', indexRouter);
app.use('/auth', AuthRouter);
app.use('/post', postRouter);
app.use('/user', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
 console.log(err);
 const status=err.statusCode || 500;
 const message=err.data;
 res.status(406).json({err:err});
});

Mongoose.connect(URI)
.then(result=>{
  console.log('Connected');
  return app.listen(80);
}).catch(err=>{console.log(err)});

module.exports = app;
