var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var flash = require('connect-flash');
var index = require('./routes/index');
var dashboard = require('./routes/dashboard');
var auth = require('./routes/auth');

var firebaseAdminDb = require('./connections/firebase_admin');
var categoriesRef = firebaseAdminDb.ref('/categories/');

require('dotenv').config();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', require('express-ejs-extend'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 10000*1000 }
}))
app.use(flash());

const authCheck = function (req, res, next) {
  // console.log('middleware', req.session);
  if (req.session.uid === process.env.ADMIN_UID) {
    //使別人無法登入自己的uid，只能使用nana
    return next();
  } else {
    return res.redirect('/auth/signin');
  }
}

app.use('/', index);
app.use('/dashboard', authCheck, dashboard);
app.use('/auth', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  let categories = {};
  categoriesRef.once('value').then(function(snapshot){
    categories = snapshot.val();
  }).then(function(){
    console.log(err.status);
    err.status = 404;
    res.render('error', {
    title: '您所查看的頁面不存在 :(',
    categories, 
    })
  })
});

module.exports = app;

app.listen(7000);
