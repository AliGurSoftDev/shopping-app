import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../features/userSlice";
import MenuBar from "../components/menu/MenuBar";

const AccountPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.user.loading);
  const userId = 1;

  useEffect(() => {
    dispatch(fetchUser(userId));
  }, [dispatch, userId]);

  const sections = [
    { title: "My Orders", path: "/orders" },
    { title: "Wishlist", path: "/wishlist" },
    { title: "Addresses", path: "/address" },
    { title: "Logout", path: "/logout" },
  ];

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <MenuBar />
      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">My Account</h1>

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
              className="p-4 bg-gray-100 hover:bg-violet-100 rounded-lg shadow-sm transition flex items-center justify-between"
            >
              <span className="font-medium">{section.title}</span>
              <span className="text-violet-600 text-lg">→</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default AccountPage;
