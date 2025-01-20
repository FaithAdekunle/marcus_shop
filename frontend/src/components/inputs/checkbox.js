import PropTypes from "prop-types";

// Handles checkboxes used as Field component or normal checkboxes
const Checkbox = ({
  id,
  name,
  input,
  label,
  checked,
  onChange,
  labelFor,
  disabled,
  className,
  labelClassName
}) => {
  const handleChange = event => {
    return onChange ? onChange(event) : input?.onChange(event.target.checked);
  };

  const handleLabelClick = () => {
    if (disabled) return;

    handleChange({
      preventDefault: () => {},
      target: {
        checked: !(input?.checked || input?.value || checked),
        name: input?.name || name
      },
      currentTarget: {
        checked: !(input?.checked || input?.value || checked),
        name: input?.name
      }
    });
  };

  return (
    <>
      <input
        id={id}
        {...input}
        type="checkbox"
        disabled={disabled}
        className={className}
        onChange={handleChange}
        checked={input?.value || checked}
      />

      <label
        aria-label="label"
        onClick={handleLabelClick}
        htmlFor={labelFor || input?.name}
        className={labelClassName || ""}
      >
        &nbsp; {label}
      </label>
    </>
  );
};

Checkbox.defaultProps = {
  input: {},
  label: "",
  labelFor: "",
  className: "",
  id: undefined,
  checked: false,
  disabled: false,
  labelClassName: "",
  onChange: undefined
};

Checkbox.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  labelFor: PropTypes.string,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  name: PropTypes.string.isRequired,
  input: PropTypes.objectOf(PropTypes.any)
};

export default Checkbox;
