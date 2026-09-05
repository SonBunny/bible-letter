import "./ReflectionPage.css"

function ReflectionPage({ reflection }) {
  return (
    <div className="reflection-page">
      <h2>Reflection</h2>
      <p>{reflection}</p>
    </div>
  )
}

export default ReflectionPage