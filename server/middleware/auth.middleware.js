const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authentication = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .send({ message: "Authentication faild . No token provided" });
    }
    const decode_token = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = { userId: decode_token.id };
    next();
  } catch (error) {
    res.status(401).send({ message: "Authentication falied , Invalid Token" });
  }
};

module.exports = authentication