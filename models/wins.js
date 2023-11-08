const mongoose = require("mongoose");

const winSchema = mongoose.Schema({
  isPlaying: Boolean,
  nameLastWinner: String,
});

const Win = mongoose.model("wins", winSchema);

module.exports = Win;
