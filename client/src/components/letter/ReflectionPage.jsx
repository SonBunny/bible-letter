import "./ReflectionPage.css"

function ReflectionPage({ reflection }) {
  return (
    <div className="reflection-card">
      <p className="reflection-label">
        Reflection
      </p>

      <h2>
        A Moment to Reflect
      </h2>

      <p className="reflection-text">
        {reflection}
      </p>

      <div className="reflection-decoration">
        ♡
      </div>
    </div>
  )
}

export default ReflectionPage