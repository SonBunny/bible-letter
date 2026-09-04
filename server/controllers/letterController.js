const crypto = require("crypto")
const Letter = require("../models/Letter")
const letters = require("../data/letters")



const createLetter = (req, res) => {
  const {
    recipientName,
    personalMessage,
    bibleVerse,
    reflection,
    closingMessage
  } = req.body

  if (
    !recipientName ||
    !personalMessage ||
    !bibleVerse ||
    !reflection ||
    !closingMessage
  ) {
    return res.status(400).json({
      message: "All fields are required"
    })
  }

 const letter = new Letter(
  crypto.randomUUID(),
  recipientName,
  personalMessage,
  bibleVerse,
  reflection,
  closingMessage
)

  letters.push(letter)

  res.status(201).json(letter)
}

const getLetterById = (req, res) => {
  const letterId = req.params.id

  const letter = letters.find((letter) => letter.id === letterId)

  if (!letter) {
    return res.status(404).json({
      message: "Letter not found"
    })
  }

  res.json(letter)
}

module.exports = {
  createLetter,
  getLetterById,
  letters
}