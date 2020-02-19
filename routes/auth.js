var express = require('express');
var router = express.Router();

var firebaseClient = require('../connections/firebase_client');

router.get('/signup', function(req, res){
  const messages = req.flash('error');
  res.render('dashboard/signup', {
    messages,  
    hasErrors: messages.length > 0,
  })
})

router.get('/signin', function(req, res){
  const session = req.session.uid ? true : false;
  const messages = req.flash('error');//在此處接收signin錯誤訊息
  // console.log(messages);
  const logout = req.flash('logout');
  res.render('dashboard/signin', {
    session,
    logout,
    hasLogout: logout.length > 0,  
    messages,
    hasErrors: messages.length > 0,
  })
})

router.get('/signout', function(req, res){
  req.session.uid = '';
  req.flash('logout', '成功登出！');
  res.redirect('signin')
})

router.post('/signup', function(req, res){
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirm_password;
  if (password !== confirmPassword) {
    req.flash('error', '兩個密碼輸入不符合');
    return res.redirect('/auth/signup');//使用return避免跳錯(Can't set headers after they are sent to the client)
  }

  firebaseClient.auth().createUserWithEmailAndPassword(email, password)
  .then(function() {
    res.redirect('/auth/signin');
  })
  .catch(function(error){
    console.log(error);
    req.flash('error', error.message);
    res.redirect('/auth/signup');
  })
})

router.post('/signin', function(req, res){
  const email = req.body.email;
  const password = req.body.password;
  firebaseClient.auth().signInWithEmailAndPassword(email, password)
  .then(function(user) {
    req.session.uid = user.user.uid;
    req.session.mail = req.body.email;
    req.flash('signin', '歡迎回來！');
    // console.log('session', req.session.uid);
    res.redirect('/dashboard');
  })
  .catch(function(error){
    console.log(error);
    req.flash('error', error.message);//在此處傳出signin錯誤訊息
    res.redirect('/auth/signin');
  })
})

module.exports = router;