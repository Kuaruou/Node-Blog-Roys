var express = require('express');
var router = express.Router();
var striptags = require('striptags')
var moment = require('moment')
var firebaseAdminDb = require('../connections/firebase_admin');

var categoriesRef = firebaseAdminDb.ref('/categories/');
var articlesRef = firebaseAdminDb.ref('/articles/')

//後台文章管理
// router.get('/', function(req, res){
//   const messages = req.flash('error');
//   res.render('dashboard/index', {
//     currentPath: '/',
//     hasErrors: messages.length > 0,
//   });
// });

router.get('/', function(req, res, next) {
  const status = req.query.status || 'public';
  const signin = req.flash('signin');
  console.log(status);
  let categories = {};
  categoriesRef.once('value').then(function(snapshot){
    categories = snapshot.val();
    return articlesRef.orderByChild('update_time').once('value');
  }).then(function(snapshot){
    const articles = [];
    snapshot.forEach(function(snapshotChild){
      if (status === snapshotChild.val().status) {
        articles.push(snapshotChild.val());
      }
    })
    articles.reverse();
    res.render('dashboard/archives', {
      articles,
      categories,
      striptags,
      moment,
      status,
      signin,
      hasSignin: signin.length > 0,
    })
  })
});

router.get('/article/create', function(req, res, next) {
  categoriesRef.once('value').then(function(snapshot){
    const categories = snapshot.val();
    // console.log('categories', categories);
    res.render('dashboard/article', {
      categories,
    });
  });
});

router.get('/article/:id', function(req, res, next) {
  const id = req.param('id');
  let categories = {};
  categoriesRef.once('value').then(function(snapshot){
    categories = snapshot.val();
    return articlesRef.child(id).once('value');
  }).then(function(snapshot){
    const article = snapshot.val();
    // console.log(article);
    res.render('dashboard/article', {
      categories,
      article,
    });
  })
});

router.get('/categories', function(req, res, next) {
  const messages = req.flash('info');
  categoriesRef.once('value').then(function (snapshot){
    const categories = snapshot.val();
    // console.log(categories);
    res.render('dashboard/categories', {
      title: '',
      categories,
      messages,
      hasInfo: messages.length > 0,
    });
  });
});

router.post('/article/create', function(req, res){
  const data = req.body;
  const articleRef = articlesRef.push();
  const key = articleRef.key;
  const updateTime = Math.floor(Date.now() / 1000);
  data.id = key;
  data.update_time = updateTime;
  articleRef.set(data)
  .then(function(){
    res.redirect(`/dashboard/article/${key}`);
  });
})

router.post('/article/update/:id', function(req, res){
  const data = req.body;
  const id = req.param('id');
  console.log(data);
  articlesRef.child(id).update(data).then(function(){
    res.redirect(`/dashboard/article/${id}`)
  })
})

router.post('/article/delete/:id', function(req, res){
  const id = req.param('id');
  articlesRef.child(id).remove();
  req.flash('info', '文章已刪除');
  res.send('文章已刪除')
  res.end();
  // res.redirect('/dashboard/categories');
});

//新增分類
router.post('/categories/create', function(req, res){
  const data = req.body;
  const categoryRef = categoriesRef.push();
  const key = categoryRef.key;
  data.id = key;
  categoriesRef.orderByChild('path').equalTo(data.path).once('value')
  .then(function(snapshot){
    if(snapshot.val() !== null) {
      req.flash('info', '已有相同路徑');
      res.redirect('/dashboard/categories');
    } else {
      categoryRef.set(data)
      .then(function(){
        res.redirect('/dashboard/categories');
      });
    }
  })
});

//刪除分類
router.post('/categories/delete/:id', function(req, res){
  const id = req.param('id');
  // console.log('id', id);
  categoriesRef.child(id).remove();
  req.flash('info', '欄位已刪除');
  res.redirect('/dashboard/categories');
});

module.exports = router;