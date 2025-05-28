import React, { useEffect, useState } from "react";
import ProductCard from "../components/product/ProductCard.jsx";
import CartSideBar from '../components/cart/CartSideBar.jsx';
import MenuBar from '../components/menu/MenuBar.jsx';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [userId] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("http://localhost:5078/api/product");
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <>       
      <MenuBar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">Explore Our Products</h1>

        {/* Responsive Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <CartSideBar userId={userId} />
    </>
  );
};

export default ProductsPage;
