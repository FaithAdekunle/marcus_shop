import { normalizeData } from "../../util/index";

const updatePart = (productId, partId, values) => {
  return async (_, _getState, { api }) => {
    function onSuccess(response) {
      const data = normalizeData(response);
      return data;
    }

    function onError(error) {
      return Promise.reject(error.response);
    }

    try {
      const response = await api.put(
        `/v1/admin/products/${productId}/parts/${partId}`,
        values
      );
      return onSuccess(response);
    } catch (error) {
      return onError(error);
    }
  };
};

export default updatePart;
