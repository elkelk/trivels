mongoose = require('mongoose')
Trivia = ->
  this.schema = mongoose.Schema
    question: String
    answer: String
    comments: [{ person: String, comment: String, created_at: Date }]
    created_at: Date
  mongoose.model('Trivia', this.schema)

exports.Trivia = Trivia()
