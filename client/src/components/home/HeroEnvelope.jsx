import "./HeroEnvelope.css"

function HeroEnvelope() {
  return (
    <div className="hero-envelope-scene">

      <div className="hero-envelope">

        <div className="hero-envelope-back" />

        <div className="hero-envelope-letter">

          <div className="hero-envelope-symbols">
            <span className="envelope-cross">✝</span>
            <span className="envelope-heart">♡</span>
          </div>

          <p>A MESSAGE</p>

          <strong>FOR YOU</strong>

        </div>

        <div className="hero-envelope-left-fold" />

        <div className="hero-envelope-right-fold" />

        <div className="hero-envelope-bottom-fold" />

        <div className="hero-envelope-seal">
          ♡
        </div>

      </div>

    </div>
  )
}

export default HeroEnvelope