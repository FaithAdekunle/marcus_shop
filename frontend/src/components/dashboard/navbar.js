import { useDispatch } from "react-redux";
import React, { useCallback } from "react";
import { NavLink } from "react-router-dom";

import signOut from "../../actions/auth/signOut";

const Navbar = () => {
  const dispatch = useDispatch();

  const onClickSignOut = useCallback(() => {
    dispatch(signOut());
  }, [dispatch]);

  return (
    <aside
      aria-label="Sidebar"
      id="separator-sidebar"
      class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
    >
      <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50">
        <ul class="space-y-2 font-medium">
          <li>
            <NavLink
              to="/market"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 18 20"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
              >
                <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
              </svg>
              <span class="flex-1 ms-3 whitespace-nowrap">Market</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
            >
              <svg
                fill="none"
                aria-hidden="true"
                viewBox="0 0 18 16"
                xmlns="http://www.w3.org/2000/svg"
                class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 "
              >
                <path
                  stroke-width="2"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                />
              </svg>
              <span class="flex-1 ms-3 whitespace-nowrap">Cart</span>
            </NavLink>
          </li>
        </ul>
        <ul class="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200">
          <li className="cursor-pointer">
            <a
              onClick={onClickSignOut}
              className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100  group"
            >
              <span class="ms-3">Sign out</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

Navbar.propTypes = {};

export default Navbar;
