const PORT = 5000
const HOST = 'http://localhost'

module.exports = {
  PORT: PORT,
  HOST: HOST,
  MONGO_URI: 'mongodb://127.0.0.1/tourist-db',
  SERVER_URL: `${HOST}:${PORT}`,
  CLIENT_ORIGIN: 'http://localhost:3000',
  secretKey: 'MySuperSecretKeyForJWT123!@#',
}
