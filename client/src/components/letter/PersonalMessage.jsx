import "./PersonalMessage.css"

function PersonalMessage({ message, recipientName }) {
  return (
    <div className="personal-letter-paper">
      <div className="personal-letter-inner">
        <p className="personal-letter-kicker">
          A Message for You
        </p>

        <h2>
          Dear {recipientName},
        </h2>

        <p className="personal-letter-message">
          {message}
        </p>

        <div className="personal-letter-signoff">
          ♡
        </div>
      </div>
    </div>
  )
}

export default PersonalMessage