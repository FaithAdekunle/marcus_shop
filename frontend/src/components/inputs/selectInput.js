import PropTypes from "prop-types";
import { useCallback, useState } from "react";

const SelectInput = ({
  input,
  value,
  options,
  onChange,
  disabled,
  placeholder
}) => {
  const [showOptions, setShowOptions] = useState(false);

  const toggleShowOptions = useCallback(() => {
    if (!disabled) setShowOptions(show => !show);
  }, [disabled]);

  const handleChange = useCallback(
    option => {
      onChange?.(option);
      input?.onChange?.(option);
      toggleShowOptions();
    },
    [input, onChange, toggleShowOptions]
  );

  return (
    <div className="relative mt-2">
      <button
        type="button"
        aria-expanded="true"
        aria-haspopup="listbox"
        onClick={toggleShowOptions}
        aria-labelledby="listbox-label"
        className="cursor-pointer grid w-full grid-cols-1 rounded-md py-1.5 pl-3 pr-2 text-left text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900 sm:text-sm/6 bg-gray-50"
      >
        <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
          <span
            className={`block truncate${
              input?.value?.value || value?.value ? "" : " text-gray-500"
            }`}
          >
            {input?.value?.label || value?.label || placeholder}
          </span>
        </span>
        <svg
          data-slot="icon"
          aria-hidden="true"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.22 10.22a.75.75 0 0 1 1.06 0L8 11.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 0 1 0-1.06ZM10.78 5.78a.75.75 0 0 1-1.06 0L8 4.06 6.28 5.78a.75.75 0 0 1-1.06-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06Z"
          />
        </svg>
      </button>

      {showOptions && options.length > 0 && (
        <ul
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
          tabIndex="-1"
          role="listbox"
          aria-labelledby="listbox-label"
          aria-activedescendant="listbox-option-3"
        >
          {options.map(option => (
            <li
              onClick={() => handleChange(option)}
              key={`${option.label}-${option.value}`}
              className="relative cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900"
            >
              <div className="flex items-center">
                <span className="ml-3 block truncate font-normal">
                  {option.label}
                </span>
              </div>
              {option.value === (input?.value?.value || value?.value) && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                  <svg
                    className="size-5"
                    data-slot="icon"
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                    />
                  </svg>
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

SelectInput.defaultProps = {
  input: {},
  disabled: false,
  value: undefined,
  onChange: undefined
};

SelectInput.propTypes = {
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.objectOf(PropTypes.any),
  input: PropTypes.objectOf(PropTypes.any),
  options: PropTypes.instanceOf(Array).isRequired
};

export default SelectInput;
