env = process.env.NODE_ENV || 'development'
config = require('../config')[env]
mongoose = require('mongoose')
Database = ->
  connect = ->
    options = { server: { socketOptions: { keepAlive: 1 } } }
    mongoose.connect(config.db, options)
  connect()
  mongoose.connection.on 'error', (err) ->
    console.log(err)
  mongoose.connection.on 'disconnected', ->
    connect()

exports.Database = Database
