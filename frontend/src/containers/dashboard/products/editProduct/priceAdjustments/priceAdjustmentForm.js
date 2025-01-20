import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useCallback, useMemo } from "react";
import arrayMutators from "final-form-arrays";
import { Form, Field } from "react-final-form";

import {
  required,
  FORM_SUBSCRIPTION,
  disabledSubmitClass
} from "../../../../../util/form";
import NumberInput from "../../../../../components/inputs/numberInput";
import SelectInput from "../../../../../components/inputs/selectInput";
import updatePriceAdjustment from "../../../../../actions/priceAdjustment/updatePriceAdjustment";
import createPriceAdjustment from "../../../../../actions/priceAdjustment/createPriceAdjustment";

const PriceDependencyForm = ({
  parts,
  options,
  onDelete,
  productId,
  afterSubmit,
  priceAdjustment
}) => {
  const dispatch = useDispatch();

  const initialValues = useMemo(() => {
    const obj = {};

    if (priceAdjustment.id) {
      const adjustee = options[priceAdjustment.attributes.adjustee_id];
      const part = parts[adjustee.attributes.part_id];
      const adjuster = options[priceAdjustment.attributes.adjuster_id];
      const adjusterPart = parts[adjuster.attributes.part_id];

      obj.adjuster_part = {
        value: adjusterPart.attributes.id,
        label: adjusterPart.attributes.name
      };
      obj.adjustee_part = {
        label: part.attributes.name,
        value: part.attributes.id
      };
      obj.adjuster = {
        label: adjuster.attributes.name,
        value: adjuster.attributes.id
      };
      obj.adjustee = {
        label: adjustee.attributes.name,
        value: adjustee.attributes.id
      };
      obj.price = priceAdjustment.attributes.price / 100.0;
    }

    return obj;
  }, [options, parts, priceAdjustment]);

  const onSubmit = useCallback(
    values => {
      if (priceAdjustment.id) {
        return dispatch(
          updatePriceAdjustment(
            productId,
            values.adjustee_part.value,
            values.adjustee.value,
            priceAdjustment.id,
            { price: values.price * 100.0 }
          )
        )
          .then(response => afterSubmit(response))
          .catch();
      }

      return dispatch(
        createPriceAdjustment(
          productId,
          values.adjustee_part.value,
          values.adjustee.value,
          {
            price: values.price * 100.0,
            adjuster_id: values.adjuster.value
          }
        )
      )
        .then(response => afterSubmit(response))
        .catch();
    },
    [afterSubmit, dispatch, priceAdjustment, productId]
  );

  const adjusteeParts = useCallback(
    values => {
      const arr = [];

      Object.values(parts).forEach(part => {
        if (values.adjuster_part?.value !== part.attributes.id) {
          arr.push({
            value: part.attributes.id,
            label: part.attributes.name
          });
        }
      });

      return arr;
    },
    [parts]
  );

  const adjusteeOptions = useCallback(
    values => {
      const arr = [];

      Object.values(options).forEach(option => {
        if (values.adjustee_part?.value === option.attributes.part_id) {
          arr.push({
            value: option.attributes.id,
            label: option.attributes.name
          });
        }
      });

      return arr;
    },
    [options]
  );

  const adjusterParts = useCallback(
    values => {
      const arr = [];

      Object.values(parts).forEach(part => {
        if (values.adjustee_part?.value !== part.attributes.id) {
          arr.push({
            value: part.attributes.id,
            label: part.attributes.name
          });
        }
      });

      return arr;
    },
    [parts]
  );

  const adjusterOptions = useCallback(
    values => {
      const arr = [];

      Object.values(options).forEach(option => {
        if (values.adjuster_part?.value === option.attributes.part_id) {
          arr.push({
            value: option.attributes.id,
            label: option.attributes.name
          });
        }
      });

      return arr;
    },
    [options]
  );

  return (
    <div className="border-b-2 border-gray-300 py-6">
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        mutators={{ ...arrayMutators }}
        subscription={FORM_SUBSCRIPTION}
        render={({
          form,
          dirty,
          values,
          submitting,
          handleSubmit,
          hasValidationErrors
        }) => (
          <form className="p-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 grid-cols-5">
              <div className="col-span-2 grid grid-cols-2">
                <label className="block col-span-2 mb-2 text-sm font-medium text-gray-900">
                  The price of
                </label>
                <div className="col-span-1 pr-2">
                  <Field
                    validate={required}
                    name="adjustee_part"
                    component={SelectInput}
                    placeholder="Select a part"
                    options={adjusteeParts(values)}
                    disabled={!!priceAdjustment.id}
                    onChange={option => {
                      form.change("adjustee", undefined);

                      form.change("adjustee_part", option);
                    }}
                  />
                </div>
                <div className="col-span-1 pr-2">
                  <Field
                    name="adjustee"
                    validate={required}
                    component={SelectInput}
                    placeholder="Select an option"
                    disabled={!!priceAdjustment.id}
                    options={adjusteeOptions(values)}
                  />
                </div>
              </div>
              <div className="col-span-1 grid grid-cols-1">
                <label className="block mb-2 col-span-1 text-sm font-medium text-gray-900">
                  Increases by
                </label>
                <div className="col-span-1 pr-2">
                  <Field
                    name="price"
                    validate={required}
                    component={NumberInput}
                    placeholder="Enter amount"
                    className="mt-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1.5 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-gray-600"
                  />
                </div>
              </div>
              <div className="col-span-2 grid grid-cols-2">
                <label className="block col-span-2 mb-2 text-sm font-medium text-gray-900">
                  When customer selects
                </label>
                <div className="col-span-1 pr-2">
                  <Field
                    validate={required}
                    name="adjuster_part"
                    component={SelectInput}
                    placeholder="Select a part"
                    options={adjusterParts(values)}
                    disabled={!!priceAdjustment.id}
                    onChange={option => {
                      form.change("adjuster", undefined);

                      form.change("adjuster_part", option);
                    }}
                  />
                </div>
                <div className="col-span-1 pr-2">
                  <Field
                    name="adjuster"
                    validate={required}
                    component={SelectInput}
                    placeholder="Select an option"
                    disabled={!!priceAdjustment.id}
                    options={adjusterOptions(values)}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-x-6 justify-end">
              <button
                type="button"
                onClick={() => onDelete(priceAdjustment.id)}
                className="cursor-pointer inline-flex items-center bg-red-300 text-gray-900 hover:bg-red-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Delete
              </button>
              {dirty && (
                <button
                  type="submit"
                  disabled={submitting || hasValidationErrors}
                  className={`inline-flex items-center bg-gray-300 text-gray-900 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center${
                    hasValidationErrors || submitting ? disabledSubmitClass : ""
                  }`}
                >
                  Save
                </button>
              )}
            </div>
          </form>
        )}
      />
    </div>
  );
};

PriceDependencyForm.propTypes = {
  onDelete: PropTypes.func.isRequired,
  afterSubmit: PropTypes.func.isRequired,
  parts: PropTypes.instanceOf(Object).isRequired,
  options: PropTypes.instanceOf(Object).isRequired,
  priceAdjustment: PropTypes.instanceOf(Object).isRequired
};

export default PriceDependencyForm;
