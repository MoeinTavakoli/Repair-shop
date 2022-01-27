const jwt = require("jsonwebtoken");
const config = require("../config");


function verifyToken(token) {
  try {
    return jwt.verify(token, config.jwt.secret);
  } catch {
    return false;
  }
}

function decodeToken(token) {
  return jwt.decode(token);
}

function generateToken(userID) {
  const obj = { id: userID };
  return jwt.sign(obj, config.jwt.secret);
}

module.exports = {
  verifyToken,
  decodeToken,
  generateToken,
};