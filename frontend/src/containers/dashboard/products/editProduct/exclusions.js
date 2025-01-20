import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useMemo, useCallback } from "react";

import Checkbox from "../../../../components/inputs/checkbox";
import deleteMutualExclusion from "../../../../actions/mutualExclusions/deleteMutualExclusion";
import createMutualExclusion from "../../../../actions/mutualExclusions/createMutualExclusion";

const Exclusions = ({
  parts,
  options,
  productId,
  mutualExclusions,
  setMutualExclusions
}) => {
  const dispatch = useDispatch();

  const exclusionsHash = useMemo(() => {
    const obj = {};

    Object.values(mutualExclusions || {}).forEach(mutualExclusion => {
      obj[
        `${mutualExclusion.attributes.excluder_id}-${mutualExclusion.attributes.excludee_id}`
      ] = mutualExclusion.id;
      obj[
        `${mutualExclusion.attributes.excludee_id}-${mutualExclusion.attributes.excluder_id}`
      ] = mutualExclusion.id;
    });

    return obj;
  }, [mutualExclusions]);

  const onChange = useCallback(
    (partId, excluderId, excludeeId) => {
      const mutualExclusionId = exclusionsHash[`${excluderId}-${excludeeId}`];

      if (mutualExclusionId) {
        dispatch(
          deleteMutualExclusion(
            productId,
            partId,
            excluderId,
            mutualExclusionId
          )
        )
          .then(() => {
            setMutualExclusions(value => {
              const newValue = { ...value };
              delete newValue[mutualExclusionId];
              return newValue;
            });
          })
          .catch();
      } else {
        dispatch(
          createMutualExclusion(productId, partId, excluderId, excludeeId)
        )
          .then(response => {
            setMutualExclusions(value => ({
              ...(value || {}),
              ...response.mutual_exclusion
            }));
          })
          .catch();
      }
    },
    [dispatch, exclusionsHash, setMutualExclusions, productId]
  );

  return (
    <>
      <div className="p-4 mt-10 rounded-lg bg-gray-50">
        <p className="text-sm text-gray-500">
          Configure part options that are mutually exclusive. Meaning options
          that cannot coexist in a customer's order.
        </p>
      </div>
      <div className="mt-8">
        {Object.values(parts || {}).length > 1 && (
          <>
            {Object.values(parts || {}).map(part => (
              <div key={`part-${part.id}`} className="mb-8">
                <div className="mb-2">{part.attributes.name}</div>
                <div className="p-4 border border-gray-900 rounded-lg grid gap-4 grid-cols-4">
                  {part.attributes.option_ids.map(optionId => {
                    const option = options[optionId];
                    return (
                      <div
                        className="col-span-2"
                        key={`option-${part.id}-${optionId}`}
                      >
                        <div className="mb-2 underline">
                          {option.attributes.name}
                        </div>
                        <div className="border border-gray-300 p-4 rounded-lg">
                          {Object.values(parts || {}).map(innerPart => {
                            if (innerPart.id === part.id) return null;

                            return (
                              <div
                                key={`inner-part-${innerPart.id}`}
                                className="border border-gray-100 p-4 rounded-lg mb-4"
                              >
                                <label className="block mb-6 text-sm font-medium text-gray-900">
                                  {innerPart.attributes.name}
                                </label>
                                <div className="grid gap-4 grid-cols-3">
                                  {innerPart.attributes.option_ids.map(
                                    optionId => {
                                      const innerOption = options[optionId];
                                      return (
                                        <div
                                          className="col-span-1"
                                          key={`option-${part.id}-${innerPart.id}-${optionId}`}
                                        >
                                          <Checkbox
                                            onChange={() =>
                                              onChange(
                                                part.id,
                                                option.id,
                                                innerOption.id
                                              )
                                            }
                                            label={innerOption.attributes.name}
                                            checked={
                                              !exclusionsHash[
                                                `${option.id}-${innerOption.id}`
                                              ]
                                            }
                                            name={`${option.id}-${innerOption.id}`}
                                            labelClassName="-ml-3 text-base cursor-pointer"
                                            className="w-4 h-4 cursor-pointer bg-gray-100 border-gray-300 rounded"
                                          />
                                        </div>
                                      );
                                    }
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

Exclusions.defaultProps = {
  parts: undefined,
  options: undefined,
  mutualExclusions: undefined
};

Exclusions.propTypes = {
  parts: PropTypes.object,
  options: PropTypes.object,
  mutualExclusions: PropTypes.object,
  setParts: PropTypes.func.isRequired,
  setOptions: PropTypes.func.isRequired,
  productId: PropTypes.number.isRequired,
  setMutualExclusions: PropTypes.func.isRequired
};

export default Exclusions;
