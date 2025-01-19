import { normalizeData } from "../../util/index";

const showProduct = id => {
  return async (_, _getState, { api }) => {
    function onSuccess(response) {
      const data = normalizeData(response);
      return data;
    }

    function onError(error) {}

    try {
      const response = await api.get(`/v1/products/${id}`);
      return onSuccess(response);
    } catch (error) {
      return onError(error);
    }
  };
};

export default showProduct;
