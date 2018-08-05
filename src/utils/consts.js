module.exports = {
  port: process.env.PORT || 1337,
  parse: {
    databaseURL: process.env.DATABASE_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/dev',
    appID: process.env.APP_ID || 'myAppId',
    masterKey: process.env.MASTER_KEY || 'myMasterKey',
  }
}
