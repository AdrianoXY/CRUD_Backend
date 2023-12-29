const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const phrase = new Schema({
  userName: {
    type: String,
    required: true,
  },
  phrase: {
    type: String,
    required: true,
  },
  sentence: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Phrase", phrase);
