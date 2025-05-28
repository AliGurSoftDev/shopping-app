import React, { useEffect, useState } from "react";
import MenuBar from "../components/menu/MenuBar";
import CartSideBar from "../components/cart/CartSideBar";
import CategoryCard from "../components/category/CategoryCard";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const userId = 1; // Replace with actual user ID logic

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:5078/api/category");
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        } else {
          console.error("Failed to fetch categories");
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-50">
      <MenuBar />
      <CartSideBar userId={userId} />

      <div className="max-w-5xl mx-auto mt-16 p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
