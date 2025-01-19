import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useCallback, useMemo } from "react";
import { Form, Field } from "react-final-form";

import {
  required,
  FORM_SUBSCRIPTION,
  disabledSubmitClass
} from "../../../util/form";
import TextArea from "../../../components/inputs/textarea";
import Checkbox from "../../../components/inputs/checkbox";
import TextInput from "../../../components/inputs/textInput";
import NumberInput from "../../../components/inputs/numberInput";
import createProduct from "../../../actions/products/createProduct";
import updateProduct from "../../../actions/products/updateProduct";

const ProductForm = ({ product, afterSubmit }) => {
  const dispatch = useDispatch();

  const initialValues = useMemo(() => {
    if (product) {
      return {
        name: product.attributes.name,
        available: product.attributes.available,
        description: product.attributes.description,
        base_price: product.attributes.base_price / 100.0
      };
    }
    return undefined;
  }, [product]);

  const onSubmit = useCallback(
    values => {
      const data = {
        name: values.name,
        available: values.available,
        description: values.description,
        base_price: (values.base_price || 0) * 100
      };

      if (product) {
        return dispatch(updateProduct(product.id, data)).then(response =>
          afterSubmit(response)
        );
      }

      return dispatch(createProduct(data)).then(response =>
        afterSubmit(response)
      );
    },
    [product, dispatch, afterSubmit]
  );

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      subscription={FORM_SUBSCRIPTION}
      render={({ dirty, submitting, handleSubmit, hasValidationErrors }) => (
        <form className="p-4 md:p-5" onSubmit={handleSubmit}>
          <div className="grid gap-4 mb-4 grid-cols-2">
            <div className="col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Name
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
            <div className="col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Price
              </label>
              <Field
                id="price"
                type="number"
                name="base_price"
                decimalPlaces={2}
                component={NumberInput}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5  focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-gray-600"
              />
            </div>
            <div className="col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Description
              </label>
              <Field
                rows="4"
                id="description"
                name="description"
                component={TextArea}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300  focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-gray-600"
              />
            </div>
            <div className="col-span-2">
              <Field
                name="available"
                label="available"
                component={Checkbox}
                labelClassName="-ml-3 text-base cursor-pointer"
                className="w-4 h-4 cursor-pointer text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2 "
              />
            </div>
          </div>
          {dirty && (
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="submit"
                disabled={submitting || hasValidationErrors}
                className={`inline-flex items-center bg-gray-300 text-gray-900 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center${
                  hasValidationErrors || submitting ? disabledSubmitClass : ""
                }`}
              >
                Save product
              </button>
            </div>
          )}
        </form>
      )}
    />
  );
};

ProductForm.defaultProps = {
  product: undefined
};

ProductForm.propTypes = {
  product: PropTypes.instanceOf(Object),
  afterSubmit: PropTypes.func.isRequired
};

export default ProductForm;
