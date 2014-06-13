var mongoose = require('mongoose');
Trivia = function() {
  this.schema = mongoose.Schema({
    question: String,
    answer: String,
    comments: [{ person: String, comment: String, created_at: Date }],
    created_at: Date
  });
  return mongoose.model('Trivia', this.schema);
};
exports.Trivia = Trivia();
