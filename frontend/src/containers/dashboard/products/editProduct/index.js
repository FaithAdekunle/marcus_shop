import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import Parts from "./parts";
import Exclusions from "./exclusions";
import BasicDetails from "./basicDetails";
import PriceAdjustments from "./priceAdjustments";
import Spinner from "../../../../components/spinner";
import showProduct from "../../../../actions/products/showProduct";

const TABS = ["Basic Details", "Parts", "Price Dependencies", "Exclusions"];

const EditProduct = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();

  const [parts, setParts] = useState();
  const [options, setOptions] = useState();
  const [product, setProduct] = useState();
  const [currentTab, setCurrentTab] = useState(TABS[0]);
  const [mutualExclusions, setMutualExclusions] = useState();
  const [priceAdjustments, setPriceAdjustments] = useState();

  useEffect(() => {
    dispatch(showProduct(productId)).then(response => {
      setParts(response.part);
      setOptions(response.option);
      setMutualExclusions(response.mutual_exclusion);
      setPriceAdjustments(response.price_adjustment);

      setProduct(Object.values(response.product)[0]);
    });
  }, [dispatch, productId]);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className="mb-4 border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
          {TABS.map(tab => (
            <li key={tab} className="me-2">
              <button
                type="button"
                onClick={() => setCurrentTab(tab)}
                className={`inline-block p-4 rounded-t-lg ${
                  currentTab === tab
                    ? " text-gray-900 border-b-2 border-gray-900"
                    : " hover:text-gray-600 hover:border-gray-300"
                }`}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        {currentTab === "Basic Details" && (
          <BasicDetails product={product} setProduct={setProduct} />
        )}
        {currentTab === "Parts" && (
          <Parts
            parts={parts}
            options={options}
            setParts={setParts}
            productId={productId}
            setOptions={setOptions}
          />
        )}

        {currentTab === "Price Dependencies" && (
          <PriceAdjustments
            parts={parts}
            options={options}
            productId={productId}
            priceAdjustments={priceAdjustments}
            setPriceAdjustments={setPriceAdjustments}
          />
        )}
        {currentTab === "Exclusions" && (
          <Exclusions
            parts={parts}
            options={options}
            productId={productId}
            mutualExclusions={mutualExclusions}
            setMutualExclusions={setMutualExclusions}
          />
        )}
      </div>
    </>
  );
};

EditProduct.propTypes = {};

export default EditProduct;
