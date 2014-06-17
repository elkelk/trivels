express = require('express')
path = require('path')
favicon = require('static-favicon')
logger = require('morgan')
cookieParser = require('cookie-parser')
bodyParser = require('body-parser')
session = require('express-session')
passport = require('passport')
env = process.env.NODE_ENV || 'development'
config = require('./config/config')[env]
mongoose = require('mongoose')
databaseIntializer = require('./config/initializers/database').Database
passportIntializer = require('./config/initializers/passport').Passport
app = express()

# view engine setup
app.set('views', path.join(__dirname, 'app', 'views'))
app.set('view engine', 'jade')

app.use(favicon())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(bodyParser())
app.use(cookieParser())
app.use(session({ secret: 'keyboard cat' }))
app.use(require('stylus').middleware(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public')))
app.use(passport.initialize())
app.use(passport.session())

require('./config/routes')(app, passport)

passportIntializer()
databaseIntializer()

# catch 404 and forward to error handler
app.use (req, res, next) ->
  err = new Error('Not Found')
  err.status = 404
  next(err)

# development error handler
# will print stacktrace
  app.use (err, req, res, next) ->
    res.status(err.status || 500)
    res.render 'error',
      message: err.message
      error: err

module.exports = app
