var TriviaModel = require('../models/trivia').Trivia;
module.exports = {};

module.exports.index = function (req, res) {
  TriviaModel.find(function(error, docs){
    res.render('index.jade', {
        user: req.user,
        title: 'Questions',
        trivia_items: docs
    });
  });
}

module.exports.auth = function(req, res) {
  res.render('auth.jade');
}
