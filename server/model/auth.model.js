const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  picture: String,
  googleId: String,
});

const User = new model("users", UserSchema);
module.exports = User;
