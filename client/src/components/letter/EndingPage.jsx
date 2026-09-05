import "./EndingPage.css"


function EndingPage({
  onReadAgain,
  onCreateLetter
}) {
  return (
    <div className="ending-page">

      {/* =====================================
          DECORATION
      ===================================== */}

      <div className="ending-decoration">
        ✦
      </div>


      {/* =====================================
          ENDING MESSAGE
      ===================================== */}

      <h2>
        May God bless you.
      </h2>


      <p>
        Thank you for reading your Bible Letter.
      </p>


      {/* =====================================
          ACTIONS
      ===================================== */}

      <div className="ending-actions">

        <button
          type="button"
          className="ending-read-again"
          onClick={onReadAgain}
        >
          ↻ Read Again
        </button>


        <button
          type="button"
          className="ending-create-letter"
          onClick={onCreateLetter}
        >
          Create Your Own Letter →
        </button>

      </div>

    </div>
  )
}


export default EndingPage