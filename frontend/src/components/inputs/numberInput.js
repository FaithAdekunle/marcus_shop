import PropTypes from "prop-types";

const NumberInput = ({
  id,
  min,
  max,
  input,
  value,
  disabled,
  onChange,
  isInteger,
  className,
  placeholder,
  decimalPlaces,
  allowNegative
}) => {
  // use /^(0|[1-9]\d*)(\.\d+)?$/.test(value) to validate for float field
  const getValue = event => {
    let prefix = "";
    let { value: val } = event.currentTarget;

    if (val === "") return val;

    if (allowNegative) {
      if (val === "-") return val;
      if (val.startsWith("-")) {
        prefix = val[0];
        val = val.substring(1);
      }
    }

    if (
      (isInteger && /^[0-9]\d*$/.test(val)) ||
      (!isInteger && /^(0|[1-9]\d*)[.]?$|^(0|[1-9]\d*)(\.\d+)?$/.test(val))
    ) {
      if ((min && parseFloat(val) < min) || (max && parseFloat(val) > max))
        return undefined;

      if (decimalPlaces && !isInteger) {
        const [beforeDecimal, afterDecimal] = val.split(".", 2);
        if (afterDecimal && afterDecimal.length > decimalPlaces)
          val = `${beforeDecimal}.${afterDecimal.slice(0, decimalPlaces)}`;
      }

      return `${prefix}${val}`;
    }

    return undefined;
  };

  const change = event => {
    if (disabled) return;

    const val = getValue(event);

    if (val !== undefined) {
      if (onChange) {
        onChange(event, val);
      } else {
        input?.onChange(val);
      }
    }
  };

  const attrs = {
    id,
    disabled,
    className,
    onChange: change,
    placeholder: placeholder || ""
  };

  if (min !== undefined) attrs.min = min; // because of 0
  if (max !== undefined) attrs.max = max;
  if (input) {
    attrs.value = input.value;
  } else if (value !== undefined) {
    attrs.value = value;
  } else {
    attrs.value = "";
  }

  return (
    <>
      <input {...(input || {})} {...attrs} />
    </>
  );
};

NumberInput.defaultProps = {
  id: "",
  className: "",
  min: undefined,
  max: undefined,
  disabled: false,
  placeholder: "",
  input: undefined,
  value: undefined,
  isInteger: false,
  onChange: undefined,
  decimalPlaces: null,
  allowNegative: false
};

NumberInput.propTypes = {
  id: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.number,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  isInteger: PropTypes.bool,
  className: PropTypes.string,
  allowNegative: PropTypes.bool,
  placeholder: PropTypes.string,
  decimalPlaces: PropTypes.number,
  input: PropTypes.objectOf(PropTypes.any)
};

export default NumberInput;
