import { Outlet } from "react-router-dom";

import useAdminPage from "../../hooks/useAdminPage";

const Admin = () => {
  useAdminPage();

  return <Outlet />;
};

Admin.propTypes = {};

export default Admin;
