import { useState } from "react"
import { QRCodeSVG } from "qrcode.react"
import "./ShareLetter.css"

function ShareLetter({ letterId }) {
  const [copied, setCopied] = useState(false)

  const letterUrl = `${window.location.origin}/letter/${letterId}`

  const copyLink = () => {
    navigator.clipboard.writeText(letterUrl)

    setCopied(true)
  }

  return (
    <div className="share-letter">
      <h2>Share Your Bible Letter</h2>

      <div className="qr-container">
        <QRCodeSVG value={letterUrl} size={180} />
      </div>

      <p>{letterUrl}</p>

      <a href={`/letter/${letterId}`}>
        Open Bible Letter
      </a>

      <button type="button" onClick={copyLink}>
        Copy Link
      </button>

      {copied && <p>Copied!</p>}
    </div>
  )
}

export default ShareLetter