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
  const messages = req.flash('error');
  res.render('dashboard/signin', {
    messages,
    hasErrors: messages.length > 0,
  })
})

router.get('/signout', function(req, res){
  req.session.uid = '';
  res.redirect('signin')
})

router.post('/signup', function(req, res){
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirm_password;
  if (password !== confirmPassword) {
    req.flash('error', '兩個密碼輸入不符合');
    res.redirect('/auth/signup');
  }

  firebaseClient.auth().createUserWithEmailAndPassword(email, password)
  .then(function() {
    res.redirect('/auth/signin');
  })
  .catch(function(error){
    console.log(error);
    req.flash('error', error.messages);
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
    console.log('session', req.session.uid);
    res.redirect('/dashboard');
  })
  .catch(function(error){
    console.log(error);
    req.flash('error', error.messages);
    res.redirect('/auth/signin');
  })
})

module.exports = router;