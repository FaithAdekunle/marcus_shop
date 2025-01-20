import { normalizeData } from "../../util/index";

const deleteMutualExclusion = (
  productId,
  partId,
  excluderId,
  mutualExclusionId
) => {
  return async (_, _getState, { api }) => {
    function onSuccess(response) {
      const data = normalizeData(response);
      return data;
    }

    function onError(error) {
      return Promise.reject(error.response);
    }

    try {
      const response = await api.delete(
        `/v1/admin/products/${productId}/parts/${partId}/options/${excluderId}/mutual_exclusions/${mutualExclusionId}`
      );
      return onSuccess(response);
    } catch (error) {
      return onError(error);
    }
  };
};

export default deleteMutualExclusion;
