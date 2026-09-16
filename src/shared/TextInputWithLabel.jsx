export default function TextInputWithLabel({
  elementId,
  labelText,
  onChange,
  ref,
  value,
  className,
}) {
  return (
    <>
      <label htmlFor={elementId}>{labelText}</label>
      <input
        type="text"
        id={elementId}
        ref={ref}
        value={value}
        onChange={onChange}
        className={className}
      />
    </>
  );
}
