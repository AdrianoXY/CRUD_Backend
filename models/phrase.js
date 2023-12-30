const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const phrase = new Schema({
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
