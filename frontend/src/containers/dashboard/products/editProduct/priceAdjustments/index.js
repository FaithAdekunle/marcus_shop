import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useState, useCallback } from "react";

import PriceAdjustmentForm from "./priceAdjustmentForm";
import deletePriceAdjustment from "../../../../../actions/priceAdjustment/deletePriceAdjustment";

const PriceAdjustments = ({
  parts,
  options,
  productId,
  priceAdjustments,
  setPriceAdjustments
}) => {
  const dispatch = useDispatch();

  const [newPriceAdjustments, setNewPriceAdjustments] = useState([]);

  const onAddNewPriceAdjustment = useCallback(() => {
    setNewPriceAdjustments(value => [...value, {}]);
  }, []);

  const onRemoveNewPriceAdjustment = useCallback(index => {
    setNewPriceAdjustments(value => value.filter((_, idx) => idx !== index));
  }, []);

  const afterCreatePriceAdjustment = useCallback(
    (response, index) => {
      setPriceAdjustments(value => ({
        ...(value || {}),
        ...response.price_adjustment
      }));
      onRemoveNewPriceAdjustment(index);
    },
    [setPriceAdjustments, onRemoveNewPriceAdjustment]
  );

  const afterUpdatePriceAdjustment = useCallback(
    response => {
      setPriceAdjustments(value => ({
        ...value,
        ...response.price_adjustment
      }));
    },
    [setPriceAdjustments]
  );

  const onDeletePriceAdjustment = useCallback(
    priceAdjustmentId => {
      const priceAdjustment = priceAdjustments[priceAdjustmentId];
      const option = options[priceAdjustment.attributes.adjustee_id];
      const part = parts[option.attributes.part_id];

      dispatch(
        deletePriceAdjustment(
          part.attributes.productId,
          part.id,
          option.id,
          priceAdjustment.id
        )
      )
        .then(() => {
          setPriceAdjustments(value => {
            const newValue = { ...value };
            delete newValue[priceAdjustmentId];
            return newValue;
          });
        })
        .catch();
    },
    [setPriceAdjustments, dispatch, options, parts, priceAdjustments]
  );

  return (
    <>
      <div className="p-4 mt-10 rounded-lg bg-gray-50">
        <p className="text-sm text-gray-500">
          Configure added costs for part options based selections of other part
          options.
        </p>
      </div>
      <div className="mt-2">
        {Object.values(priceAdjustments || {}).map((priceAdjustment, index) => {
          const adjuster = options[priceAdjustment.attributes.adjuster_id];
          const adjustee = options[priceAdjustment.attributes.adjustee_id];
          if (
            parts[adjuster?.attributes?.part_id] &&
            parts[adjustee?.attributes?.part_id]
          ) {
            return (
              <PriceAdjustmentForm
                parts={parts}
                options={options}
                productId={productId}
                key={`priceAdjustment-${index}`}
                priceAdjustment={priceAdjustment}
                onDelete={onDeletePriceAdjustment}
                afterSubmit={afterUpdatePriceAdjustment}
              />
            );
          }
          return null;
        })}
        {newPriceAdjustments.map((priceAdjustment, index) => {
          return (
            <PriceAdjustmentForm
              parts={parts}
              options={options}
              productId={productId}
              key={`new-part-${index}`}
              priceAdjustment={priceAdjustment}
              afterSubmit={response =>
                afterCreatePriceAdjustment(response, index)
              }
              onDelete={() => onRemoveNewPriceAdjustment(index)}
            />
          );
        })}
      </div>
      {newPriceAdjustments.length === 0 && (
        <div className="mt-10">
          <div className="flex items-center gap-x-6 justify-end">
            <button
              type="button"
              onClick={onAddNewPriceAdjustment}
              className="rounded-md bg-gray-300 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Add new price dependency
            </button>
          </div>
        </div>
      )}
    </>
  );
};

PriceAdjustments.defaultProps = {
  parts: undefined,
  options: undefined,
  priceAdjustments: undefined
};

PriceAdjustments.propTypes = {
  parts: PropTypes.object,
  options: PropTypes.object,
  productId: PropTypes.number.isRequired,
  priceAdjustments: PropTypes.func.isRequired,
  setPriceAdjustments: PropTypes.func.isRequired
};

export default PriceAdjustments;
