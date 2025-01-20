import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useState, useCallback } from "react";

import PartForm from "./partForm";
import deletePart from "../../../../../actions/parts/deletePart";

const DEFAULT_OPTIONS = [{ available: false }, { available: false }];

const Parts = ({ parts, options, setParts, productId, setOptions }) => {
  const dispatch = useDispatch();
  const [newParts, setNewParts] = useState([]);

  const onAddNewPart = useCallback(() => {
    setNewParts(value => [...value, {}]);
  }, []);

  const onRemoveNewPart = useCallback(index => {
    setNewParts(value => value.filter((_, idx) => idx !== index));
  }, []);

  const afterCreatePart = useCallback(
    (response, index) => {
      setParts(value => ({ ...(value || {}), ...response.part }));
      setOptions(value => ({ ...(value || {}), ...response.option }));
      onRemoveNewPart(index);
    },
    [setParts, setOptions, onRemoveNewPart]
  );

  const afterUpdatePart = useCallback(
    response => {
      setParts(value => ({ ...value, ...response.part }));
      setOptions(value => ({ ...value, ...response.option }));
    },
    [setParts, setOptions]
  );

  const onDeletePart = useCallback(
    partId => {
      dispatch(deletePart(productId, partId))
        .then(() => {
          setParts(value => {
            const newValue = { ...value };
            delete newValue[partId];
            return newValue;
          });
        })
        .catch();
    },
    [setParts, dispatch, productId]
  );

  return (
    <>
      <div className="p-4 mt-10 rounded-lg bg-gray-50">
        <p className="text-sm text-gray-500">
          If your product has different configurable parts with different
          options for a buyer to choose from, you can manage them here.
        </p>
      </div>
      <div className="mt-2">
        {Object.values(parts || {}).map((part, index) => {
          return (
            <PartForm
              part={part}
              options={options}
              productId={productId}
              key={`part-${index}`}
              onDelete={onDeletePart}
              afterSubmit={afterUpdatePart}
            />
          );
        })}
        {newParts.map((part, index) => {
          return (
            <PartForm
              part={part}
              productId={productId}
              key={`new-part-${index}`}
              options={DEFAULT_OPTIONS}
              onDelete={() => onRemoveNewPart(index)}
              afterSubmit={response => afterCreatePart(response, index)}
            />
          );
        })}
      </div>
      {newParts.length === 0 && (
        <div className="mt-10">
          <div className="flex items-center gap-x-6 justify-end">
            <button
              type="button"
              onClick={onAddNewPart}
              className="rounded-md bg-gray-300 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Add new part
            </button>
          </div>
        </div>
      )}
    </>
  );
};

Parts.defaultProps = {
  parts: undefined,
  options: undefined
};

Parts.propTypes = {
  parts: PropTypes.object,
  options: PropTypes.object,
  setParts: PropTypes.func.isRequired,
  setOptions: PropTypes.func.isRequired,
  productId: PropTypes.number.isRequired
};

export default Parts;
