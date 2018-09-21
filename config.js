exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://dev:devpass1@ds157762.mlab.com:57762/battleship'
exports.PORT = process.env.PORT || 8081;
exports.TESTBASE_URL =  process.env.DATABASE_URL || 'mongodb://dev:devpass1@ds157762.mlab.com:57762/battleship'
exports.JWT_SECRET = process.env.JWT_SECRET
exports.JWT_EXPIRY = process.env.JWT_EXPIRY