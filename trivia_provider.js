var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

TriviaProvider = function(host, port) {
  this.db = new Db('node-mongo-blog', new Server(host, port, {auto_reconnect: true}, {}));
  this.db.open(function(){});
};


TriviaProvider.prototype.getCollection = function(callback) {
  this.db.collection('trivias', function(error, trivia_collection) {
    if( error ) callback(error);
    else callback(null, trivia_collection);
  });
};

TriviaProvider.prototype.findAll = function(callback) {
  this.getCollection(function(error, trivia_collection) {
    if( error ) callback(error)
    else {
      trivia_collection.find().toArray(function(error, results) {
        if( error ) callback(error)
        else callback(null, results)
      });
    }
  });
};

TriviaProvider.prototype.findById = function(id, callback) {
  this.getCollection(function(error, trivia_collection) {
    if( error ) callback(error)
    else {
      trivia_collection.findOne({_id: trivia_collection.db.bson_serializer.ObjectID.createFromHexString(id)}, function(error, result) {
        if( error ) callback(error)
        else callback(null, result)
      });
    }
  });
};

TriviaProvider.prototype.save = function(trivias, callback) {
  this.getCollection(function(error, trivia_collection) {
    if( error ) callback(error)
    else {
      if( typeof(trivias.length)=="undefined") trivias = [trivias];
      for( var i = 0; i < trivias.length; i++ ) {
        trivia = trivias[i];
        trivia.created_at = new Date();
        if( trivia.comments === undefined ) trivia.comments = [];
        for(var j =0;j< trivia.comments.length; j++) {
          trivia.comments[j].created_at = new Date();
        }
      }
      trivia_collection.insert(trivias, function() {
        callback(null, trivias);
      });
    }
  });
};

TriviaProvider.prototype.addCommentToTrivia = function(triviaId, comment, callback) {
  this.getCollection(function(error, trivia_collection) {
    if( error ) callback( error );
    else {
      trivia_collection.update(
        {_id: trivia_collection.db.bson_serializer.ObjectID.createFromHexString(triviaId)},
        {"$push": {comments: comment}},
        function(error, trivia){
          if( error ) callback(error);
          else callback(null, trivia)
        });
    }
  });
};

exports.TriviaProvider = TriviaProvider;
