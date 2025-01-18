import PropTypes from "prop-types";
import { useCallback } from "react";

const TextInput = ({
  id,
  name,
  value,
  input,
  disabled,
  onChange,
  fieldType,
  className,
  placeholder
}) => {
  const change = useCallback(
    event => {
      if (onChange) {
        onChange(event);
      } else {
        input.onChange(event.currentTarget.value);
      }
    },
    [onChange, input]
  );

  return (
    <input
      id={id}
      onChange={change}
      disabled={disabled}
      className={className}
      placeholder={placeholder}
      name={input?.name || name}
      value={input?.value || value}
      type={fieldType || input?.type || "text"}
    />
  );
};

TextInput.defaultProps = {
  name: "",
  input: {},
  value: "",
  id: undefined,
  className: "",
  placeholder: "",
  disabled: false,
  onChange: undefined,
  fieldType: undefined
};

TextInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
  fieldType: PropTypes.string,
  placeholder: PropTypes.string,
  input: PropTypes.objectOf(PropTypes.any)
};

export default TextInput;
