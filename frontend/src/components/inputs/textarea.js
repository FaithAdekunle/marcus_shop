import PropTypes from "prop-types";
import { useCallback } from "react";

const TextArea = ({
  id,
  rows,
  name,
  value,
  input,
  disabled,
  onChange,
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
    <textarea
      id={id}
      rows={rows}
      onChange={change}
      disabled={disabled}
      className={className}
      placeholder={placeholder}
      name={input?.name || name}
      value={input?.value || value}
    />
  );
};

TextArea.defaultProps = {
  rows: 3,
  name: "",
  input: {},
  value: "",
  id: undefined,
  className: "",
  placeholder: "",
  disabled: false,
  onChange: undefined
};

TextArea.propTypes = {
  id: PropTypes.string,
  rows: PropTypes.number,
  name: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  input: PropTypes.objectOf(PropTypes.any)
};

export default TextArea;
