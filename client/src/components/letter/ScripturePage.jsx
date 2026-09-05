import "./ScripturePage.css"

function ScripturePage({ bibleVerse }) {
  return (
    <div className="scripture-card">

      <div className="scripture-decoration">
        ✦
      </div>

      <p className="scripture-label">
        Scripture
      </p>

      <p className="scripture-text">
        {bibleVerse}
      </p>

      <div className="scripture-decoration bottom">
        ✦
      </div>

    </div>
  )
}

export default ScripturePage