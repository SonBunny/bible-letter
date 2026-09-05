import { useState } from "react"
import "./Envelope.css"

function Envelope({ recipientName, onOpen }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isZooming, setIsZooming] = useState(false)

  const handleOpen = () => {
    // Prevent double-clicking the envelope
    if (isOpen) {
      return
    }

    // STEP 1:
    // Open the envelope
    setIsOpen(true)

    // STEP 2:
    // After the paper has started sliding out,
    // begin zooming the paper toward the viewer.
    setTimeout(() => {
      setIsZooming(true)
    }, 1200)

    // STEP 3:
    // After the zoom animation finishes,
    // move ViewLetter to the Personal Message screen.
    setTimeout(() => {
      onOpen()
    }, 2300)
  }

  return (
    <div
      className={`envelope-screen ${
        isZooming ? "screen-zooming" : ""
      }`}
    >
      {/* Cute background decorations */}
      <span className="envelope-decoration decoration-one">
        ✦
      </span>

      <span className="envelope-decoration decoration-two">
        ♡
      </span>

      <span className="envelope-decoration decoration-three">
        ✦
      </span>

      {/* Main envelope */}
      <div
        className={`
          envelope
          ${isOpen ? "open" : ""}
          ${isZooming ? "zooming" : ""}
        `}
        onClick={handleOpen}
      >
        {/* Back of envelope */}
        <div className="envelope-back"></div>

        {/* Letter paper */}
        <div className="letter-paper">
          <div className="letter-paper-content">
            <span className="letter-small-text">
              A Bible Letter
            </span>

            <span className="letter-paper-name">
              For {recipientName}
            </span>

            <span className="letter-heart">
              ♡
            </span>
          </div>
        </div>

        {/* Envelope flap */}
        <div className="envelope-flap"></div>

        {/* Front folds */}
        <div className="envelope-front">
          <div className="envelope-left-fold"></div>

          <div className="envelope-right-fold"></div>

          <div className="envelope-bottom-fold"></div>
        </div>

        {/* Wax seal */}
        <div className="envelope-seal">
          ♡
        </div>
      </div>

      {/* Recipient + Open button */}
      <div
        className={`envelope-details ${
          isOpen ? "opening" : ""
        }`}
      >
        <p className="envelope-recipient">
          For {recipientName}
        </p>

        <button
          type="button"
          className="open-letter-button"
          onClick={handleOpen}
          disabled={isOpen}
        >
          {isOpen ? "Opening..." : "Open Letter"}
        </button>
      </div>
    </div>
  )
}

export default Envelope