import "./StepCard.css"

function StepCard({
  number,
  icon,
  title,
  description,
  decoration,
  className = ""
}) {
  return (
    <article className={`step-card ${className}`}>

      <span className="step-number">
        {number}
      </span>

      <div className="step-icon">
        {icon}
      </div>

      <h3>
        {title}
      </h3>

      <p>
        {description}
      </p>

      <span className="step-decoration">
        {decoration}
      </span>

    </article>
  )
}

export default StepCard