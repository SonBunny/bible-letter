import FormField from "../FormField"
import "./RecipientStep.css"

function RecipientStep({
  recipientName,
  setRecipientName
}) {
  return (
    <section className="recipient-step">

      <div className="recipient-paper">

        <p className="recipient-step-kicker">
          STEP 01
        </p>

        <div className="recipient-symbols">
          <span>✝</span>
          <span>♡</span>
        </div>

        <h2>
          Who is this letter for?
        </h2>

        <p className="recipient-step-description">
          Start by telling us who will receive
          your Bible Letter.
        </p>

        <div className="recipient-field">
          <FormField
            id="recipientName"
            label="Recipient Name"
            value={recipientName}
            onChange={(event) =>
              setRecipientName(event.target.value)
            }
          />
        </div>

      </div>

    </section>
  )
}

export default RecipientStep