var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var bookRouter = require('./routes/bookRoutes')
var productRouter = require('./routes/productRoutes')
var userRouter = require('./routes/userRoutes')
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//our 
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credientials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ours
app.use('/users', usersRouter);
app.use("/api/products", productRouter); // Use product routes
app.use("/api/books", bookRouter);       // Use book routes
app.use("/api/users", userRouter);       // Use book routes


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
