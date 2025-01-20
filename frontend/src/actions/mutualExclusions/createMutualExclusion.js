import { normalizeData } from "../../util/index";

const createMutualExclusion = (productId, partId, optionId, excludeeId) => {
  return async (_, _getState, { api }) => {
    function onSuccess(response) {
      const data = normalizeData(response);
      return data;
    }

    function onError(error) {
      return Promise.reject(error.response);
    }

    try {
      const response = await api.post(
        `/v1/admin/products/${productId}/parts/${partId}/options/${optionId}/mutual_exclusions`,
        { excludee_id: excludeeId }
      );
      return onSuccess(response);
    } catch (error) {
      return onError(error);
    }
  };
};

export default createMutualExclusion;
