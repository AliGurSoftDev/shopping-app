import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../features/categorySlice";
import MenuBar from "../components/menu/MenuBar";
import CartSideBar from "../components/cart/CartSideBar";
import CategoryCard from "../components/category/CategoryCard";

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const userId = 1; // Replace with actual user ID logic

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="relative min-h-screen bg-gray-50">
      <MenuBar />
      <CartSideBar userId={userId} />

      {categories && (
        <div className="max-w-5xl mx-auto mt-16 p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
