var mongoose = require('mongoose');
Database = function() {
  mongoose.connect("mongodb://localhost:27017/node-mongo-blog");
  this.db = mongoose.connection;
  this.db.on('error', console.error.bind(console, 'connection error:'));
  this.db.once('open', function callback () {
    // yay!
  });
  return mongoose;
}
exports.Database = Database;
