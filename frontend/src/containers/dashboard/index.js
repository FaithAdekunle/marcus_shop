import React from "react";
import { Outlet } from "react-router-dom";

import useWithUser from "../../hooks/useWithUser";

const Dashboard = () => {
  useWithUser();

  return (
    <section className="container">
      <Outlet />
    </section>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
