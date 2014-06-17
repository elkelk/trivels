path = require('path')
rootPath = path.normalize(__dirname + '/..')

module.exports =
  development:
    db: 'mongodb://localhost/noobjs_dev'
    root: rootPath
    app:
      name: 'Trivels'
    facebook:
      clientID: "APP_ID"
      clientSecret: "APP_SECRET"
      callbackURL: "http://localhost:3000/auth/facebook/callback"

  test:
    db: 'mongodb://localhost/noobjs_test'
    root: rootPath
    app:
      name: 'Trivels'
    facebook:
      clientID: "APP_ID"
      clientSecret: "APP_SECRET"
      callbackURL: "http://localhost:3000/auth/facebook/callback"

  production: {}
