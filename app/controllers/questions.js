var TriviaModel = require('../models/trivia').Trivia;
module.exports = {};

module.exports.new = function (req, res) {
  res.render('question_new.jade', { title: 'New Question' });
}

module.exports.create = function (req, res) {
  var trivia = new TriviaModel({
    question: req.param('question'),
    answer: req.param('answer')
  });
  trivia.save(function(error, trivia) {
    res.redirect('/')
  });
}

module.exports.show = function (req, res) {
  TriviaModel.findOne({ _id: req.params.id }, function(error, trivia) {
    res.render('question_show.jade', {
      title: "View Question",
      trivia: trivia
    });
  });
}

module.exports.createComment = function (req, res) {
  var comment = {
    person: req.param('person'),
  comment: req.param('comment'),
  created_at: new Date()
  }
  TriviaModel.update(
    {_id: req.params.id},
    {"$push": {comments: comment}},
    function(error, trivia){
      if( error ) callback(error);
      else res.redirect('/question/' + req.params.id)
    });
}
