import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import ProductForm from "./productForm";

const AddModal = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const toggleShow = useCallback(() => {
    setShow(value => !value);
  }, []);

  const afterSubmit = useCallback(
    response => {
      navigate(`/products/${Object.keys(response.product)[0]}/edit`);
    },
    [navigate]
  );

  return (
    <>
      <div className="mt-6 flex items-center gap-x-6 justify-center">
        <button
          type="submit"
          onClick={toggleShow}
          className="rounded-md bg-gray-300 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Add new product
        </button>
      </div>

      <div
        tabindex="-1"
        aria-hidden="true"
        class={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-100 bg-opacity-80 ${
          show ? "flex" : "hidden"
        }`}
      >
        <div className="p-4 w-full max-w-md max-h-full">
          <div className="bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
              <h3 className="text-lg font-semibold text-gray-900">
                Create New Product
              </h3>
              <button
                type="button"
                onClick={toggleShow}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              >
                <svg
                  fill="none"
                  aria-hidden="true"
                  className="w-3 h-3"
                  viewBox="0 0 14 14"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-width="2"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <ProductForm afterSubmit={afterSubmit} />
          </div>
        </div>
      </div>
    </>
  );
};

AddModal.propTypes = {};

export default AddModal;
