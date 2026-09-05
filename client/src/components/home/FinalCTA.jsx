import { useNavigate } from "react-router-dom"
import "./FinalCTA.css"

function FinalCTA() {
  const navigate = useNavigate()

  return (
    <section className="final-cta">

      <div className="final-cta-note">
        <p>
          Made someone
          <br />
          come to mind?
        </p>

        <span>
          ♡
        </span>
      </div>


      <div className="final-cta-envelope">

        <div className="final-cta-envelope-back" />

        <div className="final-cta-envelope-flap" />

        <div className="final-cta-envelope-front" />

        <div className="final-cta-envelope-heart">
          ♡
        </div>

      </div>


      <div className="final-cta-content">

        <p className="final-cta-kicker">
          A SMALL GIFT WITH A BIG MEANING
        </p>

        <h2>
          Write them something
          <br />
          that matters.
        </h2>

        <button
          type="button"
          onClick={() => navigate("/create")}
        >
          Create a Bible Letter
          <span>→</span>
        </button>

        <p className="final-cta-footer">
          FAITH · LOVE · PEOPLE
        </p>

      </div>

    </section>
  )
}

export default FinalCTA