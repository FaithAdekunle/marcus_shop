import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useCallback, useMemo } from "react";
import arrayMutators from "final-form-arrays";
import { Form, Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";

import {
  required,
  FORM_SUBSCRIPTION,
  disabledSubmitClass
} from "../../../../../util/form";
import TextArea from "../../../../../components/inputs/textarea";
import updatePart from "../../../../../actions/parts/updatePart";
import Checkbox from "../../../../../components/inputs/checkbox";
import createPart from "../../../../../actions/parts/createPart";
import TextInput from "../../../../../components/inputs/textInput";
import NumberInput from "../../../../../components/inputs/numberInput";

const PartForm = ({ part, options, onDelete, productId, afterSubmit }) => {
  const dispatch = useDispatch();

  const initialValues = useMemo(() => {
    const obj = {};

    if (part.id) {
      obj.name = part.attributes.name;
      obj.available = part.attributes.available;
      obj.description = part.attributes.description;
      obj.options = (part.attributes.option_ids || []).map(optionId => {
        const option = options[optionId];
        return {
          id: option.attributes.id,
          name: option.attributes.name,
          available: option.attributes.available,
          description: option.attributes.description,
          base_price: option.attributes.base_price / 100.0
        };
      });
    } else {
      obj.options = options;
    }

    return obj;
  }, [part, options]);

  const onSubmit = useCallback(
    values => {
      const data = {
        options: [],
        name: values.name,
        description: values.description
      };

      values.options.forEach(option => {
        data.options.push({
          ...option,
          base_price: option.base_price * 100.0
        });
      });

      if (part.id) {
        return dispatch(updatePart(productId, part.id, data))
          .then(response => afterSubmit(response))
          .catch();
      }

      return dispatch(createPart(productId, data))
        .then(response => afterSubmit(response))
        .catch();
    },
    [part, productId, dispatch, afterSubmit]
  );

  return (
    <div className="border-b-2 border-gray-300 py-6">
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        mutators={{ ...arrayMutators }}
        subscription={FORM_SUBSCRIPTION}
        render={({ dirty, submitting, handleSubmit, hasValidationErrors }) => (
          <form className="p-4 md:p-5" onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 grid-cols-4">
              <div className="col-span-4">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Part name
                </label>
                <Field
                  id="name"
                  type="text"
                  name="name"
                  validate={required}
                  component={TextInput}
                  placeholder="Bicycle"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-gray-600"
                />
              </div>
              <div className="col-span-4">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Part description
                </label>
                <Field
                  rows="4"
                  name="description"
                  component={TextArea}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300  focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-gray-600"
                />
              </div>
              <div className="col-span-4">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Options
                </label>
              </div>
              <FieldArray name="options">
                {({ fields }) => (
                  <div className="grid pb-6 gap-4 grid-cols-4 col-span-4">
                    {fields.map((field, index) => (
                      <div
                        key={`${field}-${index}`}
                        className="grid pb-6 gap-4 grid-cols-2 col-span-2 border border-gray-200 p-4 rounded-lg"
                      >
                        <div className="col-span-1">
                          <label className="block mb-2 text-sm font-medium text-gray-900">
                            Name
                          </label>
                          <Field
                            validate={required}
                            component={TextInput}
                            name={`${field}.name`}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-gray-600"
                          />
                          <label className="block mb-2 mt-2 text-sm font-medium text-gray-900">
                            Price
                          </label>
                          <Field
                            validate={required}
                            component={NumberInput}
                            name={`${field}.base_price`}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-gray-600"
                          />
                          <br />
                          <Field
                            label="available"
                            component={Checkbox}
                            name={`${field}.available`}
                            labelClassName="-ml-3 text-base cursor-pointer"
                            className="w-4 h-4 cursor-pointer text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2 "
                          />
                        </div>
                        <div className="col-span-1">
                          <label className="block mb-2 text-sm font-medium text-gray-900">
                            Description
                          </label>
                          <Field
                            rows="5"
                            component={TextArea}
                            name={`${field}.description`}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300  focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-gray-600"
                          />
                          <br />
                          {fields.value.length > 2 ? (
                            <div className="text-end">
                              <span
                                onClick={() => fields.remove(index)}
                                className="underline cursor-pointer text-red-600 text-end"
                              >
                                Remove
                              </span>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </FieldArray>
            </div>
            <div className="mt-6 flex items-center gap-x-6 justify-between">
              <FieldArray name="options">
                {({ fields }) => (
                  <button
                    type="button"
                    onClick={() => fields.push({ available: false })}
                    className="inline-flex items-center bg-gray-300 text-gray-900 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Add option
                  </button>
                )}
              </FieldArray>
              <div className="flex items-center gap-x-6 justify-end">
                <button
                  type="button"
                  onClick={() => onDelete(part.id)}
                  className="cursor-pointer inline-flex items-center bg-red-300 text-gray-900 hover:bg-red-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Delete part
                </button>
                {dirty && (
                  <button
                    type="submit"
                    disabled={submitting || hasValidationErrors}
                    className={`inline-flex items-center bg-gray-300 text-gray-900 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center${
                      hasValidationErrors || submitting
                        ? disabledSubmitClass
                        : ""
                    }`}
                  >
                    Save part
                  </button>
                )}
              </div>
            </div>
          </form>
        )}
      />
    </div>
  );
};

PartForm.propTypes = {
  onDelete: PropTypes.func.isRequired,
  afterSubmit: PropTypes.func.isRequired,
  part: PropTypes.instanceOf(Object).isRequired,
  options: PropTypes.instanceOf(Object).isRequired
};

export default PartForm;
