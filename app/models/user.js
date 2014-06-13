var mongoose = require('mongoose');
User = function() {
  this.schema = mongoose.Schema({
    profile_id: String,
    provider: String,
    created_at: Date
  });
  return mongoose.model('User', this.schema);
};
exports.User = User();
