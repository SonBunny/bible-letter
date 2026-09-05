const mongoose = require("mongoose")

const letterSchema = new mongoose.Schema({
  recipientName: {
    type: String,
    required: true
  },

  personalMessage: {
    type: String,
    required: true
  },

  bibleVerse: {
    type: String,
    required: true
  },

  reflection: {
    type: String,
    required: true
  },

  closingMessage: {
    type: String,
    required: true
  },

  spotifyUrl: {
  type: String,
  required: false
  }
}, {
  timestamps: true
})

const Letter = mongoose.model("Letter", letterSchema)

module.exports = Letter