const User = require("../model/auth.model.js");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

const GoogleLogin = async (req, res) => {
  try {
    const { email, name, picture, sub } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ username: name, email, picture, googleId: sub });
      await user.save();
    }

    const token = jwt.sign(
      {
        id: user._id,
        name: user.username,
        email: user.email,
        picture: user.picture,
        exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
      },
      process.env.JWT_SECRET_KEY
    );

    return res.status(200).send({ message: "Login success", token: token });
  } catch (error) {
    res.status(503).send(error.message);
  }
};

module.exports = GoogleLogin;
