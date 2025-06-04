// src/pages/Homepage.jsx
import { useEffect, useState } from "react";
import MenuBar from "../components/menu/MenuBar";
import CartSideBar from "../components/cart/CartSideBar";
import CategoryCard from "../components/category/CategoryCard";
import ProductCard from "../components/product/ProductCard";

const Homepage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const userId = 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          fetch("http://localhost:5078/api/category/featured"),
          fetch("http://localhost:5078/api/product/featured"),
        ]);
        const [catData, prodData] = await Promise.all([
          catRes.json(),
          prodRes.json(),
        ]);
        setCategories(catData);
        setProducts(prodData);
      } catch (err) {
        console.error("Failed to fetch homepage data", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 relative">
      <MenuBar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">
          Discover Products You'll Love
        </h1>
        <p className="text-lg">Explore featured categories and top deals</p>
      </section>
      {/* Featured Categories */}
      <section className="px-6 md:px-16 lg:px-32 py-10">
        <h2 className="text-2xl font-bold mb-6  text-violet-600">
          Featured Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="px-6 md:px-16 lg:px-32 py-10">
        <h2 className="text-2xl font-bold mb-6 text-violet-600">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      <CartSideBar userId={userId} />

      <footer className="bg-gray-800 text-white text-center py-6 mt-16">
        &copy; 2025 My Shop. All rights reserved.
      </footer>
    </div>
  );
};

export default Homepage;
