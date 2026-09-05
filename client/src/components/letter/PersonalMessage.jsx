import "./PersonalMessage.css"

function PersonalMessage({ message }) {
  return (
    <div  className="personal-message-page">
      <h2>A Message for You</h2>
      <p>{message}</p>
    </div>
  )
}

export default PersonalMessage