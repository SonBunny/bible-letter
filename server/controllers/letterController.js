
const Letter = require("../models/Letter")
const mongoose = require("mongoose")




const createLetter = async (req, res) => {
  try {
    const {
      recipientName,
      personalMessage,
      bibleVerse,
      reflection,
      closingMessage,
      spotifyUrl
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

    const letter = await Letter.create({
      recipientName,
      personalMessage,
      bibleVerse,
      reflection,
      closingMessage,
      spotifyUrl
    })

    res.status(201).json(letter)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Server error"
    })
  }
}

const getLetterById = async (req, res) => {
  try {
    const letterId = req.params.id

    if (!mongoose.Types.ObjectId.isValid(letterId)) {
      return res.status(404).json({
        message: "Letter not found"
      })
    }

    const letter = await Letter.findById(letterId)

    if (!letter) {
      return res.status(404).json({
        message: "Letter not found"
      })
    }

    res.json(letter)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Server error"
    })
  }
}

module.exports = {
  createLetter,
  getLetterById
}