import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";

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
      setParts(Object.values(response.part || {}));
      setOptions(Object.values(response.option || {}));
      setMutualExclusions(Object.values(response.mutual_exclusion || {}));
      setPriceAdjustments(Object.values(response.price_adjustment || {}));

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
      <div class="mb-4 border-b border-gray-200">
        <ul class="flex flex-wrap -mb-px text-sm font-medium text-center">
          {TABS.map(tab => (
            <li key={tab} class="me-2">
              <button
                type="button"
                onClick={() => setCurrentTab(tab)}
                class={`inline-block p-4 rounded-t-lg ${
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
        <div class="p-4 mt-10 rounded-lg bg-gray-50">
          <p class="text-sm text-gray-500">
            This is some placeholder content the{" "}
            <strong class="font-medium text-gray-800">
              Profile tab's associated content
            </strong>
            . Clicking another tab will toggle the visibility of this one for
            the next. The tab JavaScript swaps classes to control the content
            visibility and styling.
          </p>
        </div>
      </div>
    </>
  );
};

EditProduct.propTypes = {};

export default EditProduct;
