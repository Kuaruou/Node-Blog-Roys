var express = require('express');
var router = express.Router();
var striptags = require('striptags')
var moment = require('moment')
var pagination = require('../modules/pagination')
var firebaseAdminDb = require('../connections/firebase_admin');

var categoriesRef = firebaseAdminDb.ref('/categories/');
var articlesRef = firebaseAdminDb.ref('/articles/')

/* GET home page. */
router.get('/', function(req, res, next) {
  let currentPage = Number.parseInt(req.query.page) || 1;//顯示第一頁
  let categories = {};
  categoriesRef.once('value').then(function(snapshot){
    categories = snapshot.val();
    return articlesRef.orderByChild('update_time').once('value');
  }).then(function(snapshot){
    const articles = [];
    snapshot.forEach(function(snapshotChild){
      if ('public' === snapshotChild.val().status) {
        articles.push(snapshotChild.val());
      }
    });
    articles.reverse();
    //分頁
    const data = pagination(articles, currentPage);
    console.log(data.data);
    hasArticle = data.data.length > 0;//data小心物件無法取出長度
    res.render('index', {
      articles: data.data,//換成每頁顯示的資料而非全部的資料
      categories,
      page: data.page,
      striptags,
      moment,
      hasArticle,
    })
  })
});

//分類選取文章頁面製作
router.get('/section/:id', function (req, res, next){
  const id = req.param('id');
  let categories = {};
  const currentPage = parseInt(req.param('page')) || 1;
  categoriesRef.once('value')
  .then((snapshot) => {
    categories = snapshot.val();
    return articlesRef.orderByChild('updateTime').once('value');
  }).then((snapshot) => {
    const articles = [];
    snapshot.forEach((snapshotChild) => {
      if(snapshotChild.val().status === 'public' && snapshotChild.val().category === id) {
        articles.push(snapshotChild.val());
      }
    })
    articles.reverse();
    const {
      page,
      data,
    } = pagination(articles, currentPage);
    hasArticle = data.length > 0;
    res.render('index', {
      page,
      categories,
      articles: data,
      striptags,
      moment,
      hasArticle,
    });
  })
});

router.get('/post/:id', function(req, res, next) {
  const id = req.param('id');
  let categories = {};
  categoriesRef.once('value').then(function(snapshot){
    categories = snapshot.val();
    return articlesRef.child(id).once('value');
  }).then(function(snapshot){
    const article = snapshot.val();
    //錯誤頁面
    if(!article) {
      return res.render('error', {
        title: '找不到該文章 :(',
        categories, //也要在錯誤頁傳入分類
      }) //使用return而不是render避免後面程式碼繼續執行
    }
    res.render('post', {
      categories,
      article,
      striptags,
      moment,
    });
  })
});

router.get('/dashboard/signup', function(req, res, next) {
  res.render('dashboard/signup');
});

module.exports = router;
