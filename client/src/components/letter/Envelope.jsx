import { useState } from "react"
import "./Envelope.css"

function Envelope({ recipientName, onOpen }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    if (isOpen) {
      return
    }

    setIsOpen(true)

    // Wait until the envelope opening animation finishes
    // before moving to the next Bible Letter section.
    setTimeout(() => {
      onOpen()
    }, 2200)
  }

  return (
    <div className="envelope-screen">
      <span className="envelope-decoration decoration-one">
        ✦
      </span>

      <span className="envelope-decoration decoration-two">
        ♡
      </span>

      <span className="envelope-decoration decoration-three">
        ✦
      </span>

      <div
        className={`envelope ${isOpen ? "open" : ""}`}
        onClick={handleOpen}
      >
        <div className="envelope-back"></div>

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

        <div className="envelope-flap"></div>

        <div className="envelope-front">
          <div className="envelope-left-fold"></div>
          <div className="envelope-right-fold"></div>
          <div className="envelope-bottom-fold"></div>
        </div>

        <div className="envelope-seal">
          ♡
        </div>
      </div>

      <div className={`envelope-details ${isOpen ? "opening" : ""}`}>
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