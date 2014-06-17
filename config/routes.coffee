passport = require('passport')
users = require('../app/controllers/users')
questions = require('../app/controllers/questions')

module.exports = (app, passport) ->
  app.get('/', users.index)
  app.get('/auth', users.auth)

  app.get('/auth/facebook', passport.authenticate('facebook'))
  app.get('/auth/facebook/callback', passport.authenticate('facebook',
    successRedirect: '/'
    failureRedirect: '/auth'
  ))

  app.get('/question/new', questions.new)
  app.post('/question/new', questions.create)
  app.get('/question/:id', questions.show)
  app.post('/question/:id/comment', questions.createComment)
