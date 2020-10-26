var createError = require('http-errors');
var express = require('express'); //npm install express-generator -g //express --view=ejs resAPI //cd resAPI //npm install
//npm i --save bcrypt mongoose cors jsonwebtoken
//npm start 
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postersRouter = require('./routes/posters');
var offreRouter = require('./routes/offres');

var app = express();

//app mongoose
var mongoose = require('mongoose');
//mongoose.connect('mongodb://root:root@172.25.66.197:27017/jobdb');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
var url = 'mongodb+srv://dbjob:dbjob@cluster0.tmtyu.mongodb.net/Cluster0?retryWrites=true&w=majority';

mongoose.connect(url, (err) => { //connect to mangodb
    if(!err)
        console.log('MongoDB connection succeeded.');
    else 
        console.log('Error in DB connection: ' + JSON.stringify(err,undefined,2));
});
// add cors
var cors = require('cors');
app.use(cors({
  //origin:'http://localhost:8100'
  origin:'*'
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posters', postersRouter);
app.use('/offres', offreRouter);

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
