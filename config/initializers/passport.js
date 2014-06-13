var env = process.env.NODE_ENV || 'development';
var config = require('../config')[env];
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../../app/models/user').User;

Passport = function() {
  passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL
  }, function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
      User.findOneAndUpdate(
        {profile_id: profile.id},
        {
          provider: "facebook",
        created_at: new Date()
        },
        { upsert: true },
        function(error, user){
          if( error ) done(error);
          else{
            done(null, user);
          }
        });
    });
  }));

  passport.serializeUser(function(user, done) {
    console.log('serializeUser: ', user._id)
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    console.log('deserializeUser: ', id)
    User.findById(id, function (err, user) {
      done(err, user)
    })
  });
}
exports.Passport = Passport;
