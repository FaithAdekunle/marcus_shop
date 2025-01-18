import { normalizeData } from "../../util/index";

const createProduct = values => {
  return async (_, _getState, { api }) => {
    function onSuccess(response) {
      const data = normalizeData(response);
      return data;
    }

    function onError(error) {}

    try {
      const response = await api.post("/v1/admin/products", values);
      return onSuccess(response);
    } catch (error) {
      return onError(error);
    }
  };
};

export default createProduct;
