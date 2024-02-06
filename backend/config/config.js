const HOST = 'http://localhost'
const PORT = 5000
module.exports = {
  PORT: 5000,
  HOST: 'http://localhost',
  MONGO_URI: 'mongodb://127.0.0.1/tourist-db',
  SERVER_URL: `${HOST}:${PORT}`,
  CLIENT_ORIGIN: 'http://localhost:3000',
  secretKey: 'MySuperSecretKeyForJWT123!@#',
}
