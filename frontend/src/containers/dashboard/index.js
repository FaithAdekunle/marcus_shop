import { useCallback } from "react";
import { Outlet } from "react-router-dom";

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
        <div className="font-mono">
          <Navbar />
          <div className="ml-64 px-16 py-4">
            <Outlet />
          </div>
        </div>
      ) : (
        renderSigningIn()
      )}
    </section>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
