var env = process.env.NODE_ENV || 'development';
var config = require('../config')[env];
var mongoose = require('mongoose');
Database = function() {
  var connect = function () {
    var options = { server: { socketOptions: { keepAlive: 1 } } }
    mongoose.connect(config.db, options);
  }
  connect();
  mongoose.connection.on('error', function (err) { console.log(err) });
  mongoose.connection.on('disconnected', function () {
    connect()
  })
}
exports.Database = Database;
