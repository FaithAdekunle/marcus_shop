import { normalizeData } from "../../util/index";

const deletePriceAdjustment = (
  productId,
  partId,
  optionId,
  priceAdjustmentId
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
        `/v1/admin/products/${productId}/parts/${partId}/options/${optionId}/price_adjustments/${priceAdjustmentId}`
      );
      return onSuccess(response);
    } catch (error) {
      return onError(error);
    }
  };
};

export default deletePriceAdjustment;
