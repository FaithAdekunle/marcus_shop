import { Routes, Route } from "react-router-dom";

import Dashboard from "./containers/dashboard";
import useGetCurrentUser from "./hooks/useGetCurrentUser";

const App = () => {
  useGetCurrentUser();

  return (
    <Routes>
      <Route path="sign_up" element={<>Sign Up</>} />
      <Route path="sign_in" element={<>Sign In</>} />
      <Route element={<Dashboard />}>
        <Route path="products" element={<>Products index page here...</>} />
        <Route
          path="products/:product_id"
          element={<>Product show page here...</>}
        />
        <Route
          path="products/:product_id/edit"
          element={<>Product edit page here...</>}
        />
        <Route path="cart" element={<>CartItems index page here...</>} />
        <Route path="*" element={<>No route</>} />
      </Route>
    </Routes>
  );
};

export default App;
