const express = require("express")
const {
  createLetter,
  getLetterById
} = require("../controllers/letterController")

const router = express.Router()


router.post("/", createLetter)

router.get("/:id", getLetterById)

module.exports = router