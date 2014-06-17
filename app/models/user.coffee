mongoose = require('mongoose')
User = ->
  this.schema = mongoose.Schema
    profile_id: String
    provider: String
    created_at: Date
  mongoose.model('User', this.schema)

exports.User = User()
