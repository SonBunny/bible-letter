import "./ClosingPage.css"


function ClosingPage({ closingMessage }) {
  return (
    <div className="closing-page">
      <h2>One Last Thing...</h2>
      <p>{closingMessage}</p>
    </div>
  )
}

export default ClosingPage