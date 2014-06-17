env = process.env.NODE_ENV || 'development'
config = require('../config')[env]
passport = require('passport')
FacebookStrategy = require('passport-facebook').Strategy
User = require('../../app/models/user').User

Passport = ->
  facebookStrategy = new FacebookStrategy {
    clientID: config.facebook.clientID
    clientSecret: config.facebook.clientSecret
    callbackURL: config.facebook.callbackURL
  }, (accessToken, refreshToken, profile, done) ->
    process.nextTick ->
      User.findOneAndUpdate { profile_id: profile.id },
        { provider: "facebook", created_at: new Date() },
        { upsert: true },
        (error, user) ->
          if(error)
            done(error)
          else
            done(null, user)

  passport.use(facebookStrategy)
  passport.serializeUser (user, done) ->
    done(null, user._id)

  passport.deserializeUser (id, done) ->
    User.findById id, (err, user) ->
      done(err, user)

exports.Passport = Passport
