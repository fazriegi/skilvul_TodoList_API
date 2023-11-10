require("dotenv").config();
var jwt = require("jsonwebtoken");

var JWT_KEY = process.env.JWT_KEY;

function createJWTToken(userId) {
  var token = jwt.sign(
    {
      userId,
    },
    JWT_KEY
  );

  return token;
}

module.exports = { createJWTToken };
