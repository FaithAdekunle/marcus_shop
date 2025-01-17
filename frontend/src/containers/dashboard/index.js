import React from "react";
import { Outlet } from "react-router";

const Dashboard = () => {
  return (
    <section className="container">
      <Outlet />
    </section>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
