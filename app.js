var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


const endpoints = require('./constants/endpoints');

var app = express();

// const DB = 'mongodb+srv://ethereal-design:SravaniPonnam@etherealdesigns.8i9gchn.mongodb.net/?retryWrites=true&w=majority'

// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/test');
//   console.log('db connected')
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }

// const latestDesignSchema = new mongoose.Schema({
//   name: String
// });

// const LatestDesign = mongoose.model('LatestDesigns', latestDesignSchema);



// mongoose.connect(DB,{
//   useNewUrlParser:true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false
// }).then(()=>{
//   console.log('DB connection successfull')
// }).catch((err)=> console.log('DB connection error'))


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, '../ed-react/build')));  
app.use(cors({credentials: true,origin: true}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api',indexRouter);
app.use(endpoints.FETCH_LATEST_DESIGNS,indexRouter);
app.use(endpoints.GET_USER_INFO_GMAIL,indexRouter);
app.use(endpoints.GET_USER_INFO_PHONE,indexRouter);
app.use(endpoints.SAVE_USER_INFO,indexRouter);

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
