TriviaModel = require('../models/trivia').Trivia
module.exports = {}

module.exports.new = (req, res) ->
  res.render('question_new.jade', { title: 'New Question' })

module.exports.create = (req, res) ->
  trivia = new TriviaModel
    question: req.param('question')
    answer: req.param('answer')

  trivia.save (error, trivia) ->
    res.redirect('/')

module.exports.show = (req, res) ->
  TriviaModel.findOne { _id: req.params.id }, (error, trivia) ->
    res.render 'question_show.jade',
      title: "View Question"
      trivia: trivia

module.exports.createComment = (req, res) ->
  comment =
    person: req.param('person')
    comment: req.param('comment')
    created_at: new Date()

  TriviaModel.update {_id: req.params.id},
    {"$push": {comments: comment}},
    (error, trivia) ->
      if( error )
        callback(error)
      else
        res.redirect('/question/' + req.params.id)
