export const FormField = ({
  name,
  type,
  label,
  placeholder,
  value,
  error,
  onChange,
  onBlur,
  className,
  max,
  rows,
}) => {
  const inputProps = {
    required: true,
    name,
    placeholder,
    value,
    onChange,
    onBlur,
    className: `${className} ${error ? (type === "textarea" ? "textarea-error" : "input-error") : ""}`,
  };

  return (
    <div>
      {label && (
        <label className="floating-label">
          <span>{label}</span>
          {type === "textarea" ? (
            <textarea {...inputProps} rows={rows} />
          ) : (
            <input {...inputProps} type={type} max={max} />
          )}
        </label>
      )}
      {!label &&
        (type === "textarea" ? (
          <textarea {...inputProps} rows={rows} />
        ) : (
          <input {...inputProps} type={type} max={max} />
        ))}
      {error && <p className="text-error text-sm mt-1">{error}</p>}
    </div>
  );
};
