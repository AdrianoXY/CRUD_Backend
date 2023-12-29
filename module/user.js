const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
  userName: {
    type: String,
    required: true,
  },
  userGender: {
    type: String,
    required: true,
  },
  userBirth: {
    type: String,
    required: true,
  },
  userPhone: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  userAddress: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", user);
