import { useNavigate } from "react-router-dom"
import HeroEnvelope from "./HeroEnvelope"
import "./HeroSection.css"

function HeroSection() {
  const navigate = useNavigate()

  return (
    <section className="hero-section">

      <div className="hero-content">

        <p className="hero-kicker">
          SOMETIMES A MESSAGE DESERVES MORE THAN A TEXT
        </p>

        <h1>
          Bible Letter
          <span className="hero-heart">
            ♡
          </span>
        </h1>

        <p className="hero-description">
          A meaningful way to send a message.
          <br />
          Your words, Scripture, and music — wrapped in a letter.
        </p>

        <div className="hero-divider">
          <span></span>
          <span>♡</span>
          <span></span>
        </div>

        <HeroEnvelope />

        <button
          type="button"
          className="hero-create-button"
          onClick={() => navigate("/create")}
        >
          Create a Bible Letter
          <span>→</span>
        </button>

      </div>

      <span className="hero-decoration hero-sparkle-one">
        ✦
      </span>

      <span className="hero-decoration hero-sparkle-two">
        ✦
      </span>

      <span className="hero-decoration hero-floating-heart">
        ♡
      </span>

    </section>
  )
}

export default HeroSection