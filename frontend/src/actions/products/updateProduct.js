import { normalizeData } from "../../util/index";

const updateProduct = (id, values) => {
  return async (_, _getState, { api }) => {
    function onSuccess(response) {
      const data = normalizeData(response);
      return data;
    }

    function onError(error) {}

    try {
      const response = await api.put(`/v1/admin/products/${id}`, values);
      return onSuccess(response);
    } catch (error) {
      return onError(error);
    }
  };
};

export default updateProduct;
