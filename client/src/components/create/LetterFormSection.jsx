import "./LetterFormSection.css"


function LetterFormSection({
  number,
  title,
  description,
  children,
  className = ""
}) {
  return (
    <section
      className={`letter-form-section ${className}`}
    >

      <div className="letter-form-section-heading">

        <span className="letter-form-section-number">
          {number}
        </span>


        <div>

          <h2>
            {title}
          </h2>


          {description && (
            <p>
              {description}
            </p>
          )}

        </div>

      </div>


      <div className="letter-form-section-content">
        {children}
      </div>

    </section>
  )
}


export default LetterFormSection