TriviaModel = require('../models/trivia').Trivia
module.exports = {}

module.exports.index = (req, res) ->
  TriviaModel.find (error, docs) ->
    res.render 'index.jade',
        user: req.user
        title: 'Questions'
        trivia_items: docs

module.exports.auth = (req, res) ->
  res.render('auth.jade')
