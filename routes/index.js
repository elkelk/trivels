var express = require('express');
var router = express.Router();
var TriviaModel = require('../trivia_model').TriviaModel;

router.get('/', function(req, res) {
  TriviaModel.find(function(error, docs){
    res.render('index.jade', {
        title: 'Questions',
        trivia_items: docs
    });
  });
});

module.exports = router;
