const jwt = require('jsonwebtoken');

/**
 * @param {object} payload - The object to encode
 * @return {object} The encoded JWT
 */
function encodeToken(payload) {
  // ToDo read secret from environment variable or use
  // a certificate
  return jwt.sign(payload, 'secret');
}

/**
 * @param {object} token - The JWT token to decode
 * @return {object} The decoded token (if it was verified)
 * or an error
 */
function decodeToken(token) {
  try {
    return jwt.verify(token, 'secret');
  } catch (err) {
    throw new Error('Token is invalid');
  }
}

module.exports = {
  encodeToken,
  decodeToken,
};
