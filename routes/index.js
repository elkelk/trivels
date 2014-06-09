var express = require('express');
var router = express.Router();
var TriviaProvider = require('../trivia_provider').TriviaProvider;

var triviaProvider = new TriviaProvider('localhost', 27017);

router.get('/', function(req, res) {
  triviaProvider.findAll(function(error, docs){
    res.render('index.jade', {
        title: 'Questions',
        trivia_items: docs
    });
  });
});

module.exports = router;
