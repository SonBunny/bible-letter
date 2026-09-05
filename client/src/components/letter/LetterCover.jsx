import "./LetterCover.css"

function LetterCover({ recipientName }) {
  return (
    <div className="letter-cover">
      <h1>A Bible Letter for {recipientName}</h1>
      <p>Someone made this especially for you.</p>
    </div>
  )
}

export default LetterCover