function FormField({ id, label, value, onChange, type = "text" }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>

      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default FormField