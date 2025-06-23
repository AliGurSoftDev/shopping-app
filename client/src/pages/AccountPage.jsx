import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../features/authSlice";
import MenuBar from "../components/menu/MenuBar";
import Spinner from "../components/ui/Spinner";
import { useDelayedSpinner } from "../hooks/useDelayedSpinner";

const AccountPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.status) === "loading";

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const handleLogout = () => {
    alert("You have been logged out successfully.");
    console.log(localStorage);

    dispatch(logout());
    console.log(localStorage);
  };

  const sections = [
    { title: "My Orders", path: "/orders" },
    { title: "Wishlist", path: "/wishlist" },
    { title: "Addresses", path: "/address", state: { prevPage: "account" } },
    { title: "Logout", path: "/login", onClick: handleLogout },
  ];
  return (
    <>
      <MenuBar />
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold mb-6 text-violet-600">My Account</h1>
          {isLoading || !user ? (
            <div className="mt-20 items-center">
              <Spinner />
            </div>
          ) : (
            <>
              <div className="bg-white shadow rounded-lg p-6 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-white bg-violet-600">
                    {user.firstName[0]}
                  </div>
                  <div>
                    <p className="text-lg font-semibold">
                      {user.firstName + " " + user.lastName}
                    </p>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sections.map((section) => (
                  <Link
                    to={section.path}
                    key={section.title}
                    state={section.state}
                    onClick={section.onClick}
                    className="p-4 bg-gray-100 hover:bg-violet-100 rounded-lg shadow-sm transition flex items-center justify-between"
                  >
                    <span className="font-medium">{section.title}</span>
                    <span className="text-violet-600 text-lg">→</span>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
    </>
  );
};

export default AccountPage;
