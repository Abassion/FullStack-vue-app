const mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    index : true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  displayUserName: {
    type: String
  },
  days: {
    type: Object,
    default: {}
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
