import { Routes, Route } from "react-router-dom";

import SignUp from "./containers/auth/signUp";
import SignIn from "./containers/auth/signIn";
import Dashboard from "./containers/dashboard";
import useGetCurrentUser from "./hooks/useGetCurrentUser";

const App = () => {
  useGetCurrentUser();

  return (
    <Routes>
      <Route path="sign_up" element={<SignUp />} />
      <Route path="sign_in" element={<SignIn />} />

      <Route element={<Dashboard />}>
        <Route path="market" element={<>Products index page here...</>} />
        <Route
          path="market/:product_id"
          element={<>Product show page here...</>}
        />
        <Route
          path="market/:product_id/edit"
          element={<>Product edit page here...</>}
        />
        <Route path="cart" element={<>CartItems index page here...</>} />
      </Route>

      <Route path="*" element={<SignUp />} />
    </Routes>
  );
};

export default App;
