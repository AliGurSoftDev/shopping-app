import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../features/categorySlice";
import MenuBar from "../components/menu/MenuBar";
import CartSideBar from "../components/cart/CartSideBar";
import CategoryCard from "../components/category/CategoryCard";
import Spinner from "../components/ui/Spinner";
import { useDelayedSpinner } from "../hooks/useDelayedSpinner";

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const isLoading = useSelector((state) => state.category.status) === "loading";
  const showSpinner = useDelayedSpinner(isLoading, 200);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="relative min-h-screen bg-gray-50">
      <MenuBar />
      {showSpinner || !categories ? (
        <div className="items-center mt-40">
          <Spinner />
        </div>
      ) : (
        <div className="max-w-5xl mx-auto mt-16 p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
      <CartSideBar />;
    </div>
  );
};

export default CategoriesPage;
