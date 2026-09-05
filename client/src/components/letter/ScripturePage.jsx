import "./ScripturePage.css"

function ScripturePage({ bibleVerse }) {
  return (
    <div className="scripture-page">
      <h2>Scripture</h2>
      <p>{bibleVerse}</p>
    </div>
  )
}

export default ScripturePage