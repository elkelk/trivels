var express = require('express');
var passport = require('passport');
var router = express.Router();
var TriviaModel = require('../app/models/trivia').Trivia;

router.get('/', function(req, res) {
  console.log(req.user);
  TriviaModel.find(function(error, docs){
    res.render('index.jade', {
        user: req.user,
        title: 'Questions',
        trivia_items: docs
    });
  });
});

router.get('/auth', function(req, res) {
  res.render('auth.jade');
});

router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/auth'
}));

module.exports = router;
