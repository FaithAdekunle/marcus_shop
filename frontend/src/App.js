import { Routes, Route } from "react-router-dom";

import SignUp from "./containers/auth/signUp";
import SignIn from "./containers/auth/signIn";
import Dashboard from "./containers/dashboard";
import Products from "./containers/dashboard/products";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import EditProduct from "./containers/dashboard/products/editProduct";
import Admin from "./containers/dashboard/admin";

const App = () => {
  useGetCurrentUser();

  return (
    <Routes>
      <Route path="sign_up" element={<SignUp />} />
      <Route path="sign_in" element={<SignIn />} />

      <Route element={<Dashboard />}>
        <Route path="market" element={<Products />} />

        <Route element={<Admin />}>
          <Route path="products/:productId/edit" element={<EditProduct />} />
        </Route>

        <Route
          path="products/:productId"
          element={<>Product show page here...</>}
        />
        <Route path="cart" element={<>CartItems index page here...</>} />
      </Route>

      <Route path="*" element={<SignUp />} />
    </Routes>
  );
};

export default App;
