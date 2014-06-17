path = require('path')
rootPath = path.normalize(__dirname + '/..')

module.exports =
  development:
    db: 'mongodb://localhost:27017/trivels'
    root: rootPath
    app:
      name: 'Trivels'
    facebook: 
      clientID: "524720727651307"
      clientSecret: "e9adcfa8935e4ca9f7f41c66f10108d8"
      callbackURL: "http://localhost:3000/auth/facebook/callback"

  test:
    db: 'mongodb://localhost:27017/trivels-test'
    root: rootPath
    app:
      name: 'Trivels'
    facebook:
      clientID: "APP_ID"
      clientSecret: "APP_SECRET"
      callbackURL: "http://localhost:3000/auth/facebook/callback"

  production: {}
