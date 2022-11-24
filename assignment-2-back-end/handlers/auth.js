const { verifyToken } = require("../helpers");

module.exports = async (req, res, next) => {
  try {
    const token = await req.headers.authorization.split(" ")[1];
    const user = await verifyToken(token);
    console.log(user);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({
      error: "Invalid token",
    });
  }
};
