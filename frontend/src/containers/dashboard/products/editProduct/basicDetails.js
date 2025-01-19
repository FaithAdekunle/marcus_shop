import PropTypes from "prop-types";
import { useCallback } from "react";
import ProductForm from "../productForm";

const BasicDetails = ({ product, setProduct }) => {
  const afterSubmit = useCallback(
    response => {
      setProduct(Object.values(response.product)[0]);
    },
    [setProduct]
  );

  return (
    <>
      <div className="p-4 mt-10 rounded-lg bg-gray-50">
        <p className="text-sm text-gray-500">
          Set your product's basic details like name, description, pictures and
          base price.
        </p>
      </div>
      <div className="mt-10">
        <ProductForm product={product} afterSubmit={afterSubmit} />
      </div>
    </>
  );
};

BasicDetails.propTypes = {
  product: PropTypes.object.isRequired,
  setProduct: PropTypes.func.isRequired
};

export default BasicDetails;
