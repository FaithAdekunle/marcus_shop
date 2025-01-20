import PropTypes from "prop-types";
import { useCallback } from "react";

const FileInput = ({
  name,
  value,
  accept,
  input,
  disabled,
  onChange,
  className
}) => {
  const change = useCallback(
    event => {
      onChange?.(event.target.files);
      input?.onChange?.(event.currentTarget.value);
    },
    [onChange, input]
  );
  return (
    <input
      type="file"
      accept={accept}
      onChange={change}
      disabled={disabled}
      className={className}
      name={input?.name || name}
      value={input?.value || value}
    />
  );
};

FileInput.defaultProps = {
  rows: 3,
  name: "",
  input: {},
  value: "",
  className: "",
  disabled: false,
  accept: undefined,
  onChange: undefined
};

FileInput.propTypes = {
  rows: PropTypes.number,
  name: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  accept: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  input: PropTypes.objectOf(PropTypes.any)
};

export default FileInput;
