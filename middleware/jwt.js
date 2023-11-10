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

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(400).json({ message: "authorization header not found" });
    return;
  }

  const token = authHeader.split(" ")[1];

  if (!token) return res.status(400).json({ message: "jwt must be provided" });

  try {
    const { userId } = jwt.verify(token, JWT_KEY);
    req.userId = userId;
    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

module.exports = { createJWTToken, verifyToken };
