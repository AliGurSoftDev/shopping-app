import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../features/productSlice.js";
import ProductCard from "../components/product/ProductCard.jsx";
import CartSideBar from "../components/cart/CartSideBar.jsx";
import MenuBar from "../components/menu/MenuBar.jsx";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const userId = 1;
  const products = useSelector((state) => state.product.products);
  const loading = useSelector((state) => state.product.loading);
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
  if (loading) return <p>Yükleniyor...</p>;

  return (
    <>
      <MenuBar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
          Explore Our Products
        </h1>

        {/* Responsive Product Grid */ console.log(products)}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <CartSideBar userId={userId} />
    </>
  );
};

export default ProductsPage;
