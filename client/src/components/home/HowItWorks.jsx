import StepCard from "./StepCard"
import "./HowItWorks.css"

function HowItWorks() {
  return (
    <section
      className="how-it-works"
      id="how-it-works"
    >
      <div className="how-it-works-heading">

        <p>
          FROM YOUR HEART TO THEIRS
        </p>

        <h2>
          How It Works
        </h2>

        <span>
          Four simple steps to create something meaningful.
        </span>

      </div>

      <div className="steps-grid">

        <StepCard
            number="01"
            icon="✎"
            title="Write"
            description="Write the message you want to share with someone."
            decoration="♡"
            className="step-card-one"
        />

        <StepCard
          number="02"
          icon="◫"
          title="Add Scripture"
          description="Choose a Bible verse and add a reflection from your heart."
          decoration="✦"
          className="step-card-two"
        />

        <StepCard
          number="03"
          icon="♫"
          title="Choose Music"
          description="Choose peaceful background music for them to listen to while reading."
          decoration="♪"
          className="step-card-three"
        />

        <StepCard
          number="04"
          icon="◇"
          title="Seal & Share"
          description="Create the letter and send the special link to them."
          decoration="♡"
          className="step-card-four"
        />

      </div>
    </section>
  )
}

export default HowItWorks