import { useState } from "react"
import { QRCodeSVG } from "qrcode.react"

import "./ShareLetter.css"


function ShareLetter({ letterId }) {
  const [copied, setCopied] = useState(false)

  const letterUrl =
    `${window.location.origin}/letter/${letterId}`


  const copyLink = () => {
    navigator.clipboard.writeText(letterUrl)

    setCopied(true)
  }


  return (
    <div className="share-letter">

      <h2>
        Share Your Bible Letter
      </h2>


      <div className="qr-container">

        <QRCodeSVG
          value={letterUrl}
          size={180}

          /* Light QR + forest green background */
          fgColor="#f7f1df"
          bgColor="#40513a"

          level="H"

          imageSettings={{
            src: "/images/bible-letter-logo.png",
            height: 38,
            width: 38,
            excavate: true
          }}
        />

      </div>


      <p>
        {letterUrl}
      </p>


      <div className="share-letter-actions">
        <a href={`/letter/${letterId}`}>
          Open Letter →
        </a>

        <button
          type="button"
          onClick={copyLink}
        >
          {copied ? "Copied ✓" : "Copy Link"}
        </button>
      </div>


      {copied && (
        <p className="copied-message">
          Your link is ready to share.
        </p>
      )}

    </div>
  )
}


export default ShareLetter