var database = require('./database').Database;
var mongoose = new database();
TriviaModel = function() {
  this.schema = mongoose.Schema({
    question: String,
    answer: String,
    comments: [{ person: String, comment: String, created_at: Date }],
    created_at: Date
  });
  return mongoose.model('Trivia', this.schema);
};
exports.TriviaModel = TriviaModel();
