import { Outlet } from "react-router-dom";
import React, { useCallback } from "react";

import Spinner from "../../components/spinner";
import useWithUser from "../../hooks/useWithUser";
import Navbar from "../../components/dashboard/navbar";
import useCurrentUser from "../../hooks/useCurrentUser";

const Dashboard = () => {
  useWithUser();

  const { currentUser } = useCurrentUser();

  const renderSigningIn = useCallback(
    () => (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    ),
    []
  );

  return (
    <section>
      {currentUser ? (
        <>
          <Navbar />
          <div className="p-4">
            <Outlet />
          </div>
        </>
      ) : (
        renderSigningIn()
      )}
    </section>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
