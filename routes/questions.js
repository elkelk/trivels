var express = require('express');
var router = express.Router();
var TriviaProvider = require('../trivia_provider').TriviaProvider;
var triviaProvider = new TriviaProvider('localhost', 27017);

router.get('/new', function(req, res) {
  res.render('question_new.jade', { title: 'New Question' });
});

router.post('/new', function(req, res) {
    triviaProvider.save({
        question: req.param('question'),
        answer: req.param('answer')
    }, function( error, docs) {
        res.redirect('/')
    });
});

router.get('/:id', function(req, res) {
  triviaProvider.findById(req.params.id, function(error, trivia) {
    res.render('question_show.jade', {
      title: "View Question",
      trivia: trivia
    });
  });
});

router.post('/:id/comment', function(req, res) {
  triviaProvider.addCommentToTrivia(req.params.id, {
    person: req.param('person'),
    comment: req.param('comment'),
    created_at: new Date()
  } , function( error, docs) {
    res.redirect('/question/' + req.params.id)
  });
});
module.exports = router;
