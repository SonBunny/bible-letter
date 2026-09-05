function TextAreaField({ id, label, value, onChange }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>

      <textarea
        id={id}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default TextAreaField