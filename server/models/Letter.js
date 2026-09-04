class Letter {
  constructor(
    id,
    recipientName,
    personalMessage,
    bibleVerse,
    reflection,
    closingMessage
  ) {
    this.id = id
    this.recipientName = recipientName
    this.personalMessage = personalMessage
    this.bibleVerse = bibleVerse
    this.reflection = reflection
    this.closingMessage = closingMessage
    this.createdAt = new Date()
  }
}

module.exports = Letter