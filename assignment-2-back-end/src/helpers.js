const jwt = require("jsonwebtoken");

const verifyToken = async (token) => {
  try {
    const decodedToken = await jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await decodedToken;
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { verifyToken };
